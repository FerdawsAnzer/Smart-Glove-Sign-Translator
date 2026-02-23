#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <math.h>

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_timer.h"
#include "esp_log.h"
#include "esp_err.h"

#include "driver/i2c.h"
#include "esp_adc/adc_oneshot.h"

#define TAG "SMART_GLOVE"

#define I2C_PORT I2C_NUM_0
#define I2C_SDA_GPIO 8
#define I2C_SCL_GPIO 9
#define I2C_FREQ_HZ 400000

#define MPU6050_ADDR 0x68
#define MPU6050_WHOAMI_REG 0x75
#define MPU6050_PWR_MGMT_1 0x6B
#define MPU6050_SMPLRT_DIV 0x19
#define MPU6050_CONFIG 0x1A
#define MPU6050_GYRO_CONFIG 0x1B
#define MPU6050_ACCEL_CONFIG 0x1C
#define MPU6050_ACCEL_XOUT_H 0x3B

static esp_err_t i2c_init(void)
{
    i2c_config_t conf = {
        .mode = I2C_MODE_MASTER,
        .sda_io_num = I2C_SDA_GPIO,
        .scl_io_num = I2C_SCL_GPIO,
        .sda_pullup_en = GPIO_PULLUP_ENABLE,
        .scl_pullup_en = GPIO_PULLUP_ENABLE,
        .master.clk_speed = I2C_FREQ_HZ};
    ESP_ERROR_CHECK(i2c_param_config(I2C_PORT, &conf));
    return i2c_driver_install(I2C_PORT, conf.mode, 0, 0, 0);
}

static esp_err_t i2c_write_reg(uint8_t dev, uint8_t reg, uint8_t val)
{
    uint8_t data[2] = {reg, val};
    return i2c_master_write_to_device(I2C_PORT, dev, data, sizeof(data), pdMS_TO_TICKS(100));
}

static esp_err_t i2c_read_regs(uint8_t dev, uint8_t reg, uint8_t *buf, size_t len)
{
    return i2c_master_write_read_device(I2C_PORT, dev, &reg, 1, buf, len, pdMS_TO_TICKS(100));
}

static void i2c_scan(void)
{
    printf("I2C scan...\n");
    int found = 0;
    for (int addr = 1; addr < 127; addr++)
    {
        esp_err_t err = i2c_master_probe(I2C_PORT, addr, pdMS_TO_TICKS(30));
        if (err == ESP_OK)
        {
            printf("  Found device at 0x%02X\n", addr);
            found++;
        }
    }
    if (!found)
        printf("  No I2C devices found.\n");
}

static esp_err_t mpu6050_init(void)
{
    ESP_ERROR_CHECK(i2c_write_reg(MPU6050_ADDR, MPU6050_PWR_MGMT_1, 0x00));
    vTaskDelay(pdMS_TO_TICKS(50));

    ESP_ERROR_CHECK(i2c_write_reg(MPU6050_ADDR, MPU6050_SMPLRT_DIV, 0x09));
    ESP_ERROR_CHECK(i2c_write_reg(MPU6050_ADDR, MPU6050_CONFIG, 0x04));
    ESP_ERROR_CHECK(i2c_write_reg(MPU6050_ADDR, MPU6050_GYRO_CONFIG, 0x08));
    ESP_ERROR_CHECK(i2c_write_reg(MPU6050_ADDR, MPU6050_ACCEL_CONFIG, 0x10));

    uint8_t who = 0;
    ESP_ERROR_CHECK(i2c_read_regs(MPU6050_ADDR, MPU6050_WHOAMI_REG, &who, 1));
    if (who != 0x68)
    {
        ESP_LOGW(TAG, "MPU6050 WHOAMI unexpected: 0x%02X (expected 0x68). Still may work.", who);
    }
    else
    {
        ESP_LOGI(TAG, "MPU6050 detected (WHOAMI=0x%02X)", who);
    }
    return ESP_OK;
}

static int16_t be16_to_i16(uint8_t hi, uint8_t lo)
{
    return (int16_t)((hi << 8) | lo);
}

static esp_err_t mpu6050_read(float *ax, float *ay, float *az, float *gx, float *gy, float *gz)
{
    uint8_t raw[14] = {0};
    esp_err_t err = i2c_read_regs(MPU6050_ADDR, MPU6050_ACCEL_XOUT_H, raw, sizeof(raw));
    if (err != ESP_OK)
        return err;

    int16_t ax_raw = be16_to_i16(raw[0], raw[1]);
    int16_t ay_raw = be16_to_i16(raw[2], raw[3]);
    int16_t az_raw = be16_to_i16(raw[4], raw[5]);

    int16_t gx_raw = be16_to_i16(raw[8], raw[9]);
    int16_t gy_raw = be16_to_i16(raw[10], raw[11]);
    int16_t gz_raw = be16_to_i16(raw[12], raw[13]);

    const float accel_lsb_per_g = 4096.0f;
    const float gyro_lsb_per_dps = 65.5f;

    const float g = 9.80665f;
    *ax = (ax_raw / accel_lsb_per_g) * g;
    *ay = (ay_raw / accel_lsb_per_g) * g;
    *az = (az_raw / accel_lsb_per_g) * g;

    float gx_dps = gx_raw / gyro_lsb_per_dps;
    float gy_dps = gy_raw / gyro_lsb_per_dps;
    float gz_dps = gz_raw / gyro_lsb_per_dps;

    const float deg2rad = (float)(M_PI / 180.0);
    *gx = gx_dps * deg2rad;
    *gy = gy_dps * deg2rad;
    *gz = gz_dps * deg2rad;

    return ESP_OK;
}

#define FLEX_SENSOR 5
#define COL_FLEX_SENSOR 4

static const int flex_gpio[FLEX_SENSOR] = {1, 2, 3, 4, 5};

static int normal_value[FLEX_SENSOR];
static int filtered_value[FLEX_SENSOR];
static int value_to_filter[FLEX_SENSOR][COL_FLEX_SENSOR];
static int index_cir = 0;
static int sample_count = 0;

static adc_oneshot_unit_handle_t adc_handle;
static adc_channel_t flex_chan[FLEX_SENSOR];
static adc_unit_t flex_unit[FLEX_SENSOR];

static void adc_init_flex(void)
{
    adc_oneshot_unit_init_cfg_t unit_cfg = {.unit_id = ADC_UNIT_1};
    ESP_ERROR_CHECK(adc_oneshot_new_unit(&unit_cfg, &adc_handle));

    adc_oneshot_chan_cfg_t chan_cfg = {
        .bitwidth = ADC_BITWIDTH_DEFAULT,
        .atten = ADC_ATTEN_DB_11};

    for (int i = 0; i < FLEX_SENSOR; i++)
    {
        ESP_ERROR_CHECK(adc_oneshot_io_to_channel(flex_gpio[i], &flex_unit[i], &flex_chan[i]));
        if (flex_unit[i] != ADC_UNIT_1)
        {

            ESP_LOGE(TAG, "GPIO%d maps to ADC_UNIT_%d. Choose a GPIO that maps to ADC_UNIT_1.",
                     flex_gpio[i], (int)flex_unit[i] + 1);
        }
        ESP_ERROR_CHECK(adc_oneshot_config_channel(adc_handle, flex_chan[i], &chan_cfg));
        ESP_LOGI(TAG, "Flex[%d] GPIO%d -> ADC_UNIT_1 channel %d", i, flex_gpio[i], flex_chan[i]);
    }
}

void app_main(void)
{
    memset(value_to_filter, 0, sizeof(value_to_filter));
    memset(filtered_value, 0, sizeof(filtered_value));

    ESP_ERROR_CHECK(i2c_init());
    i2c_scan();
    ESP_ERROR_CHECK(mpu6050_init());

    adc_init_flex();

    printf("seq,timestamp,f1,f2,f3,f4,f5,ax,ay,az,gx,gy,gz\n");

    uint32_t seq = 0;

    while (1)
    {
        for (int i = 0; i < FLEX_SENSOR; i++)
        {
            int raw = 0;
            ESP_ERROR_CHECK(adc_oneshot_read(adc_handle, flex_chan[i], &raw));
            normal_value[i] = raw;
            value_to_filter[i][index_cir] = raw;
        }

        if (sample_count < COL_FLEX_SENSOR)
            sample_count++;
        index_cir = (index_cir + 1) % COL_FLEX_SENSOR;

        for (int i = 0; i < FLEX_SENSOR; i++)
        {
            long sum = 0;
            for (int j = 0; j < sample_count; j++)
                sum += value_to_filter[i][j];
            filtered_value[i] = (int)(sum / sample_count);
        }

        float ax, ay, az, gx, gy, gz;
        esp_err_t err = mpu6050_read(&ax, &ay, &az, &gx, &gy, &gz);
        if (err != ESP_OK)
        {
            ESP_LOGW(TAG, "MPU read failed: %s", esp_err_to_name(err));
            ax = ay = az = gx = gy = gz = 0;
        }

        seq++;
        uint64_t timestamp_ms = esp_timer_get_time() / 1000ULL;

        printf("%lu,%llu,", (unsigned long)seq, (unsigned long long)timestamp_ms);

        for (int i = 0; i < FLEX_SENSOR; i++)
        {
            printf("%d,", filtered_value[i]);
        }

        printf("%.3f,%.3f,%.3f,%.3f,%.3f,%.3f\n",
               ax, ay, az, gx, gy, gz);

        vTaskDelay(pdMS_TO_TICKS(50));
    }
}