#include <Wire.h>

const int MPU = 0x68; // MPU6050 I2C address
int16_t AccX, AccY, AccZ;
int16_t GyroX, GyroY, GyroZ;

void setup()
{
    Serial.begin(9600);
    Wire.begin(20, 21);
    // Wake up MPU6050
    Wire.beginTransmission(MPU);
    Wire.write(0x6B); // Power management register
    Wire.write(0);    // Wake up
    Wire.endTransmission(true);
    Serial.println("MPU6050 Initialized");
}

void loop()
{

    int flex_1 = analogRead(1);
    int flex_2 = analogRead(2);
    int flex_3 = analogRead(4);
    int flex_4 = analogRead(5);
    int flex_5 = analogRead(7);

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

    Serial.print("f1,f2,f3,f4,f5,ax,ay,az,gx,gy,gz ");
    Serial.println();
    Serial.print("{ ");
    Serial.print(flex_1);
    Serial.print(",");
    Serial.print(flex_2);
    Serial.print(",");
    Serial.print(flex_3);
    Serial.print(",");
    Serial.print(flex_4);
    Serial.print(",");
    Serial.print(flex_5);
    Serial.print(",");
    Serial.print(AccX);
    Serial.print(",");
    Serial.print(AccY);
    Serial.print(",");
    Serial.print(AccZ);
    Serial.print(",");
    Serial.print(GyroX);
    Serial.print(",");
    Serial.print(GyroY);
    Serial.print(",");
    Serial.print(GyroZ);
    Serial.print(" }");

    Serial.println();
    delay(500);
}