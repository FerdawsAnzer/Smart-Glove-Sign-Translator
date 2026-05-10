#include <WiFi.h>
#include <WebSocketsClient.h>
#include <Wire.h>

const char *ssid = "Mr ZEKA";      // put the original name of your wifi network here
const char *password = "Zeka2909"; // put the original password of your wifi network here

const char *server_ip = "10.71.1.244"; // put the IP address of your server here
const int server_port = 8765;          // put the port number of your server here (make sure it matches the one used in your server code)

WebSocketsClient webSocket;

const int MPU = 0x68;

int16_t AccX, AccY, AccZ;
int16_t GyroX, GyroY, GyroZ;

void webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
    if (type == WStype_CONNECTED)
        Serial.println("Connected !");
    if (type == WStype_DISCONNECTED)
        Serial.println("Disconnected !");
}

void setup()
{
    Serial.begin(9600);

    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
    }

    Wire.begin();

    Wire.beginTransmission(MPU);
    Wire.write(0x6B);
    Wire.write(0);
    Wire.endTransmission(true);

    webSocket.begin(server_ip, server_port, "/ws"); // Make sure the path matches the one used in your server code
    webSocket.onEvent(webSocketEvent);
}

void loop()
{
    webSocket.loop();

    static unsigned long lastSend = 0;

    if (millis() - lastSend > 50)
    {
        lastSend = millis();

        if (webSocket.isConnected())
        {

            int flex1 = analogRead(1); // change the pin numbers if your flex sensors are connected to different analog pins
            int flex2 = analogRead(2); // change the pin numbers if your flex sensors are connected to different analog pins
            int flex3 = analogRead(3); // change the pin numbers if your flex sensors are connected to different analog pins
            int flex4 = analogRead(4); // change the pin numbers if your flex sensors are connected to different analog pins
            int flex5 = analogRead(5); // change the pin numbers if your flex sensors are connected to different analog pins

            Wire.beginTransmission(MPU);
            Wire.write(0x3B);
            Wire.endTransmission(false);
            Wire.requestFrom(MPU, 14, true);

            AccX = Wire.read() << 8 | Wire.read();
            AccY = Wire.read() << 8 | Wire.read();
            AccZ = Wire.read() << 8 | Wire.read();

            Wire.read();
            Wire.read();

            GyroX = Wire.read() << 8 | Wire.read();
            GyroY = Wire.read() << 8 | Wire.read();
            GyroZ = Wire.read() << 8 | Wire.read();

            // wi will modifie a bit this part for us to have a good json format to send to the server
            String json = "{";

            json += "\"flex\":{";
            json += "\"flex1\":" + String(flex1) + ",";
            json += "\"flex2\":" + String(flex2) + ",";
            json += "\"flex3\":" + String(flex3) + ",";
            json += "\"flex4\":" + String(flex4) + ",";
            json += "\"flex5\":" + String(flex5);
            json += "},";

            json += "\"acc\":{";
            json += "\"x\":" + String(AccX) + ",";
            json += "\"y\":" + String(AccY) + ",";
            json += "\"z\":" + String(AccZ);
            json += "},";

            json += "\"gyro\":{";
            json += "\"x\":" + String(GyroX) + ",";
            json += "\"y\":" + String(GyroY) + ",";
            json += "\"z\":" + String(GyroZ);
            json += "}";

            json += "}";

            webSocket.sendTXT(json);
            Serial.println(json);
        }

        else
        {
            Serial.println("WebSocket not connected, cannot send data");
        }
    }
}