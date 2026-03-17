// Arduino IDE

#include <Wire.h>

const int MPU = 0x68; // MPU6050 I2C address
int16_t AccX, AccY, AccZ;
int16_t GyroX, GyroY, GyroZ;
void setup()
{
    Serial.begin(9600);
    Wire.begin();
    // Wake up MPU6050
    Wire.beginTransmission(MPU);
    Wire.write(0x6B); // Power management register
    Wire.write(0);    // Wake up
    Wire.endTransmission(true);
    Serial.println("MPU6050 Initialized");
}
void loop()
{
    // Request data from MPU6050
    Wire.beginTransmission(MPU);
    Wire.write(0x3B); // Starting register for Accel data
    Wire.endTransmission(false);
    Wire.requestFrom(MPU, 14, true);
    // Read Accelerometer data
    AccX = Wire.read() << 8 | Wire.read();
    AccY = Wire.read() << 8 | Wire.read();
    AccZ = Wire.read() << 8 | Wire.read();
    // Skip temperature
    Wire.read();
    Wire.read();
    // Read Gyroscope data
    GyroX = Wire.read() << 8 | Wire.read();
    GyroY = Wire.read() << 8 | Wire.read();
    GyroZ = Wire.read() << 8 | Wire.read();
    // Print values
    Serial.print("AccX: ");
    Serial.print(AccX);
    Serial.print(" | AccY: ");
    Serial.print(AccY);
    Serial.print(" | AccZ: ");
    Serial.print(AccZ);
    Serial.print(" || GyroX: ");
    Serial.print(GyroX);
    Serial.print(" | GyroY: ");
    Serial.print(GyroY);
    Serial.print(" | GyroZ: ");
    Serial.println(GyroZ);
    delay(500);
}