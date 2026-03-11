#include <Arduino.h>
#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

#include "motion/Motion.h"
#include "display/display.h"


// =======================================================
// WIFI
// =======================================================
const char *WIFI_SSID = "LinkSpeed_Bifrost";
const char *WIFI_PASS = "Luna@016";


// Ultrassônico
static const int PIN_US_TRIG = 3;
static const int PIN_US_ECHO = 2;

// =======================================================
// WEBSOCKET
// =======================================================
WebSocketsServer ws(81);

// Busy flag
bool isBusy = false;

bool isWaitingConnection = true;

// =======================================================
// ULTRASSÔNICO
// =======================================================
float distanceCm = -1;
unsigned long lastUsRead = 0;

// =======================================================
// ULTRASSÔNICO
// =======================================================
float readUltrasonicCm()
{
  // Dispara pulso
  digitalWrite(PIN_US_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_US_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_US_TRIG, LOW);

  // Lê o echo
  // timeout em micros: 25000us ~ 4m
  unsigned long duration = pulseIn(PIN_US_ECHO, HIGH, 25000);

  if (duration == 0)
    return -1;

  // velocidade do som ~343 m/s
  // cm = (duracao_us * 0.0343) / 2
  float cm = (duration * 0.0343f) / 2.0f;

  // Limita valores absurdos
  if (cm < 2 || cm > 400)
    return -1;

  return cm;
}


// =======================================================
// MOTION
// =======================================================
Motion motion(true, false);

// =======================================================
// STATUS
// =======================================================

String buildStatus() {
  StaticJsonDocument<1024> doc;

  doc["type"] = "status";
  doc["ip"] = WiFi.localIP().toString();
 
  // sensores
  doc["distanceCm"] = distanceCm;


  doc["isBusy"] = isBusy;
  // Info
  doc["speed"] = motion.getVelocity();

  String msg;
  serializeJson(doc, msg);
  return msg;
}

void sendStatus(uint8_t clientNum)
{
  String msg = buildStatus();
  ws.sendTXT(clientNum, msg);
}

void broadcastStatus()
{

  String msg = buildStatus();
  ws.broadcastTXT(msg);
}

// =======================================================
// WS HANDLERS
// =======================================================
void handleMessage(uint8_t clientNum, const String &payload)
{
  StaticJsonDocument<512> doc;
  DeserializationError err = deserializeJson(doc, payload);
  if (err)
    return;
  const char *type = doc["type"] | "";
  // MOVE
  if (strcmp(type, "move") == 0)
  {
    int timeMs = doc["timeMs"] | 0;
    bool dir = doc["dir"] | false;
    isBusy = true;
    motion.move(timeMs, dir);
    isBusy = false;
    return;
  }

  // TURN
  if (strcmp(type, "turn") == 0)
  {
    float angle = doc["angle"] | 0;
    isBusy = true;
    motion.turn(angle);
    isBusy = false;
    return;
  }

  // STOP
  if (strcmp(type, "stop") == 0)
  {
    isBusy = true;
    motion.stop();
    isBusy = false;
    return;
  }
  
  // CALIBRAÇÃO
  if (strcmp(type, "calibrate") == 0)
  {
    isBusy = true;
    if (doc["leftStopUs"].is<int>() && doc["rightStopUs"].is<int>())
    {
      motion.calibrateStopMotors(doc["leftStopUs"].as<int>(), doc["rightStopUs"].as<int>());
    }
    isBusy = false;
    sendStatus(clientNum);

    return;
  }

  // SPEED RANGE
  if (strcmp(type, "setSpeed") == 0)
  {
    int v = doc["value"] | 250;
    isBusy = true;
    motion.setVelocity(v);
    sendStatus(clientNum);
    isBusy = false;
    return;
  }

  if(strcmp(type, "customMove") == 0) {
      int l =  constrain(doc["left"] | 0, -100, 100);
      int r = constrain(doc["right"] | 0, -100, 100);
      motion.customMove(l,r);
  }
  // STATUS
  if (strcmp(type, "status") == 0)
  {
    sendStatus(clientNum);
    return;
  }
}

void onWsEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_CONNECTED:
  {
    sendStatus(num);
    drawConnected();
    break;
  }

  case WStype_DISCONNECTED:
  {
    motion.stop();
    break;
  }

  case WStype_TEXT:
  {
    String msg = String((char *)payload);
    handleMessage(num, msg);
    break;
  }

  default:
    break;
  }
}

// =======================================================
// WIFI
// =======================================================
void connectWifi()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  Serial.print("Conectando no Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(300);
    Serial.print(".");
  }
  ws.connectedClients();

  Serial.println();
  Serial.print("Conectado! IP: ");
  Serial.println(WiFi.localIP());
}

// =======================================================
// LOOP DE LEITURA DE SENSORES
// =======================================================
void updateSensors()
{
  // Ultrassônico: a cada 80ms
  if (millis() - lastUsRead > 80)
  {
    lastUsRead = millis();
    distanceCm = readUltrasonicCm();
  }
}

// =======================================================
// SETUP
// =======================================================
void setup()
{
  Serial.begin(115200);
  delay(500);
  initDisplay();
  delay(100);
  drawCalibrationScreen();
  motion.begin();
  delay(800);
  // Ultrassônico
  pinMode(PIN_US_TRIG, OUTPUT);
  pinMode(PIN_US_ECHO, INPUT);
  digitalWrite(PIN_US_TRIG, LOW);

  connectWifi();
  motion.stop();
  
  // WebSocket
  ws.begin();
  ws.onEvent(onWsEvent);
  drawWaitingConnection(WiFi.localIP().toString());

}

// =======================================================
// LOOP
// =======================================================
void loop()
{
  ws.loop();

  if(ws.connectedClients() == 0) {
    if(!isWaitingConnection) {
      motion.stop();
      drawWaitingConnection(WiFi.localIP().toString());
    }
    isWaitingConnection = true;
  }

  updateSensors();

  // Telemetria: 5x por segundo
  static unsigned long lastStatus = 0;
  if (millis() - lastStatus > 200)
  {
    lastStatus = millis();
    broadcastStatus();
  }
}