#include <ESP8266WiFi.h>
const char* ssid = "s19079";
const char* password = "11111111";
#include "DHT.h"
#define DHTPIN 2 // DHT11이 연결된 핀
#define DHTTYPE DHT11 // DHT 11, DHT시리즈중 11을 선택합니다.
DHT dht(DHTPIN, DHTTYPE);
WiFiServer server(80);
void setup() {
    Serial.begin(115200);
    delay(10);
    Serial.println("DHTxx test!");
    dht.begin();

    // Connect to WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    // Start the server
    server.begin();
    Serial.println("Server started");
    // Print the IP address
    Serial.print("Use this URL to connect: ");
    Serial.print("http://");
    Serial.print(WiFi.localIP());
    Serial.println("/");
}

void loop() {
    // Check if a client has connected
    WiFiClient client = server.available();
    if (!client) {
        return;
    }
    // Wait until the client sends some data
    Serial.println("new client");
    while(!client.available()){
        delay(1);
    }
    // Read the first line of the request
    String request = client.readStringUntil('\r');
    Serial.println(request);
    client.flush();

    delay(2000);
    float h = dht.readHumidity();// 습도를 측정합니다.
    float t = dht.readTemperature();// 온도를 측정합니다.
    float f = dht.readTemperature(true);// 화씨 온도를 측정합니다.
    // 값 읽기에 오류가 있으면 오류를 출력합니다.
    if (isnan(h) || isnan(t) || isnan(f)) {
        Serial.println("Failed to read from DHT sensor!");
        return;
    }
    // 보정된 화씨 값을 가져옵니다.
    float hif = dht.computeHeatIndex(f, h);
    // 보정된 섭씨 값을 가져옵니다.
    float hic = dht.computeHeatIndex(t, h, false);
    // Return the response
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println(""); // do not forget this one
    client.println("<!DOCTYPE HTML>");
    client.println("<html>");
    client.print("Humidity: ");
    client.print(h);
    client.print(" %\t");
    client.print("Temperature: ");
    client.print(t);
    client.print(" *C ");
    client.print(f );
    delay(1);
    Serial.println("Client disonnected");
    Serial.println("");

}
