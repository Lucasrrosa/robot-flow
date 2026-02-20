#include <Arduino.h>
#include <WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <Wire.h>
#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <MPU6050_tockn.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27,16,2);

// =======================================================
// WIFI
// =======================================================
const char *WIFI_SSID = "LinkSpeed_Bifrost";
const char *WIFI_PASS = "Luna@016";

// =======================================================
// PINOS (AJUSTE AQUI)
// =======================================================
// Servos
static const int PIN_SERVO_LEFT = 4;
static const int PIN_SERVO_RIGHT = 5;

// Ultrassônico
static const int PIN_US_TRIG = 2;
static const int PIN_US_ECHO = 3;

// =======================================================
// SERVO CONFIG
// =======================================================
Servo servoLeft;
Servo servoRight;

int leftStopUs = 1500;
int rightStopUs = 1500;

int speedRangeUs = 250;

// Inversão (por causa do espelhamento)
bool invertLeft = false;
bool invertRight = true;

// Estado atual
float currentLeft = 0.0f;
float currentRight = 0.0f;

// =======================================================
// FAILSAFE
// =======================================================
unsigned long lastCmdMs = 0;
unsigned long CMD_TIMEOUT_MS = 700;

// =======================================================
// WEBSOCKET
// =======================================================
WebSocketsServer ws(81);


// =======================================================
// MPU6050
// =======================================================


MPU6050 mpu6050(Wire);

bool mpuOk = false;

// =======================================================
// ULTRASSÔNICO
// =======================================================
float distanceCm = -1;
unsigned long lastUsRead = 0;

// =======================================================
// UTILS
// =======================================================
int clampInt(int v, int mn, int mx)
{
  if (v < mn)
    return mn;
  if (v > mx)
    return mx;
  return v;
}

float clampFloat(float v, float mn, float mx)
{
  if (v < mn)
    return mn;
  if (v > mx)
    return mx;
  return v;
}

int speedToUs(float speed, int stopUs)
{
  speed = clampFloat(speed, -1.0f, 1.0f);
  return stopUs + (int)(speed * speedRangeUs);
}

void applyMotors(float left, float right)
{
  currentLeft = clampFloat(left, -1.0f, 1.0f);
  currentRight = clampFloat(right, -1.0f, 1.0f);

  float l = currentLeft;
  float r = currentRight;

  if (invertLeft)
    l = -l;
  if (invertRight)
    r = -r;

  int leftUs = speedToUs(l, leftStopUs);
  int rightUs = speedToUs(r, rightStopUs);

  servoLeft.writeMicroseconds(leftUs);
  servoRight.writeMicroseconds(rightUs);
}

void stopMotors()
{
  applyMotors(0, 0);
}

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
// STATUS
// =======================================================
void sendStatus(uint8_t clientNum)
{
  StaticJsonDocument<1024> doc;

  doc["type"] = "status";
  doc["ip"] = WiFi.localIP().toString();
  // motores
  doc["left"] = currentLeft;
  doc["right"] = currentRight;
  // calibração
  doc["leftStopUs"] = leftStopUs;
  doc["rightStopUs"] = rightStopUs;
  doc["speedRangeUs"] = speedRangeUs;
  // sensores
  doc["distanceCm"] = distanceCm;
  // MPU
  doc["mpuOk"] = mpuOk;
  doc["accX"] = mpu6050.getAccX();
  doc["accY"] = mpu6050.getAccY();
  doc["accZ"] = mpu6050.getAccZ();

  doc["gyroX"] = mpu6050.getGyroX();
  doc["gyroY"] = mpu6050.getGyroY();
  doc["gyroZ"] = mpu6050.getGyroZ();

  doc["angleX"] = mpu6050.getAngleX();
  doc["angleY"] = mpu6050.getAngleY();
  doc["angleZ"] = mpu6050.getAngleZ();

  doc["tempC"] = mpu6050.getTemp();

  String msg;
  serializeJson(doc, msg);
  ws.sendTXT(clientNum, msg);
}

void broadcastStatus()
{
  StaticJsonDocument<1024> doc;

  doc["type"] = "status";
  doc["ip"] = WiFi.localIP().toString();
  // motores
  doc["left"] = currentLeft;
  doc["right"] = currentRight;
  // calibração
  doc["leftStopUs"] = leftStopUs;
  doc["rightStopUs"] = rightStopUs;
  doc["speedRangeUs"] = speedRangeUs;
  // sensores
  doc["distanceCm"] = distanceCm;
  // MPU
  doc["mpuOk"] = mpuOk;
  doc["accX"] = mpu6050.getAccX();
  doc["accY"] = mpu6050.getAccY();
  doc["accZ"] = mpu6050.getAccZ();

  doc["gyroX"] = mpu6050.getGyroX();
  doc["gyroY"] = mpu6050.getGyroY();
  doc["gyroZ"] = mpu6050.getGyroZ();

  doc["angleX"] = mpu6050.getAngleX();
  doc["angleY"] = mpu6050.getAngleY();
  doc["angleZ"] = mpu6050.getAngleZ();

  doc["tempC"] = mpu6050.getTemp();

  String msg;
  serializeJson(doc, msg);
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
    float left = doc["left"] | 0.0f;
    float right = doc["right"] | 0.0f;

    applyMotors(left, right);
    lastCmdMs = millis();
    return;
  }

  // STOP
  if (strcmp(type, "stop") == 0)
  {
    stopMotors();
    lastCmdMs = millis();
    return;
  }

  // CALIBRAÇÃO
  if (strcmp(type, "calibrate") == 0)
  {
    if (doc["leftStopUs"].is<int>())
    {
      leftStopUs = clampInt(doc["leftStopUs"].as<int>(), 1300, 1700);
    }
    if (doc["rightStopUs"].is<int>())
    {
      rightStopUs = clampInt(doc["rightStopUs"].as<int>(), 1300, 1700);
    }
    sendStatus(clientNum);
    return;
  }

  // SPEED RANGE
  if (strcmp(type, "speedRange") == 0)
  {
    int v = doc["value"] | 250;
    speedRangeUs = clampInt(v, 50, 450);
    sendStatus(clientNum);
    return;
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
    lastCmdMs = millis();
    sendStatus(num);
    break;
  }

  case WStype_DISCONNECTED:
  {
    stopMotors();
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

  Serial.println();
  Serial.print("Conectado! IP: ");
  Serial.println(WiFi.localIP());
}

// =======================================================
// MPU
// =======================================================
void setupMpu()
{

  delay(100);
  mpu6050.begin();
  mpu6050.calcGyroOffsets(true);
  mpuOk = true;

  Serial.println("MPU6050 OK!");
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

  // MPU: a cada loop (é rápido)
  if (mpuOk)
  {
    mpu6050.update();
  }
}

// =======================================================
// SETUP
// =======================================================
void setup()
{
  Serial.begin(115200);

/* Setup do MPU - new */
  Wire.begin();

  lcd.init(); 
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("Calibrando sens.");
  lcd.setCursor(0,1);
  lcd.print("Aguarde");

  setupMpu();
  delay(800);

  // Ultrassônico
  pinMode(PIN_US_TRIG, OUTPUT);
  pinMode(PIN_US_ECHO, INPUT);
  digitalWrite(PIN_US_TRIG, LOW);

  connectWifi();

  // Servos
  servoLeft.setPeriodHertz(50);
  servoRight.setPeriodHertz(50);

  servoLeft.attach(PIN_SERVO_LEFT, 500, 2500);
  servoRight.attach(PIN_SERVO_RIGHT, 500, 2500);

  stopMotors();

  // WebSocket
  ws.begin();
  ws.onEvent(onWsEvent);

  Serial.println("WebSocket server rodando na porta 81");
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Robot ready!");
  lcd.setCursor(0,1);
  lcd.print(WiFi.localIP());
}

// =======================================================
// LOOP
// =======================================================
void loop()
{
  ws.loop();

  updateSensors();

  // // Fail-safe
  // if (millis() - lastCmdMs > CMD_TIMEOUT_MS) {
  //   stopMotors();
  // }

  // Telemetria: 5x por segundo
  static unsigned long lastStatus = 0;
  if (millis() - lastStatus > 200)
  {
    lastStatus = millis();
    broadcastStatus();
  }
}