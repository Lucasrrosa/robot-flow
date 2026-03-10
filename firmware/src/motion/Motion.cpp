#include "Motion.h"

void setupMPU()
{
  Wire.begin();
  // Wake up
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B);
  Wire.write(0);
  Wire.endTransmission(true);
  // Gyro config ±250°/s
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x1B);
  Wire.write(0x00);
  Wire.endTransmission(true);
}

float lerGyroZ()
{
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x47);
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 2, true);

  int16_t raw = Wire.read() << 8 | Wire.read();

  return raw / 131.0; // Conversão para graus/seg
}

float clampFloat(float v, float mn, float mx)
{
  if (v < mn)
    return mn;
  if (v > mx)
    return mx;
  return v;
}

void Motion::applyMotors(int left, int right)
{

  currentLeftVelocity = invertLeft ? left : -left;
  currentRightVelocity = invertRight ? right : -right;

  servoLeft.writeMicroseconds(currentLeftVelocity + leftStopUs);
  servoRight.writeMicroseconds(currentRightVelocity + rightStopUs);
}

void Motion::calibrarGyro()
{
  const int N = 1000;
  float soma = 0;
  for (int i = 0; i < N; i++)
  {
    soma += lerGyroZ();
    delay(2);
  }

  Motion::gyroBiasZ = soma / N;
}

Motion::Motion(bool invertLeft, bool invertRight) : invertLeft(invertLeft), invertRight(invertRight) {}

void Motion::begin()
{
  setupMPU();
  Motion::calibrarGyro();
  servoLeft.attach(PIN_SERVO_LEFT, 500, 2500);
  servoRight.attach(PIN_SERVO_RIGHT, 500, 2500);
}

int Motion::getVelocity() {
  return speedRangeUs;
}

void Motion::move(int timeMs, bool dir)
{
  int stopTimestamp = millis() + timeMs;
  int vel = dir ? speedRangeUs : -speedRangeUs;
  applyMotors(vel, vel);
  while (millis() < stopTimestamp)
  {
  }
  applyMotors(0, 0);
}

void Motion::turn(float angle)
{
  float actualAngle = 0;
  unsigned long beforeTime = micros();

  while (abs(actualAngle) < abs(angle))
  {
    unsigned long now = micros();
    float dt = (now - beforeTime) / 1000000.0;
    beforeTime = now;
    float gyroZ = lerGyroZ() - gyroBiasZ;
    actualAngle += gyroZ * dt;
    float erro = angle - actualAngle;
    float velocidade = Kp * erro;
    velocidade = constrain(velocidade, -speedRangeUs, speedRangeUs);
    if (abs(erro) < 10)
      velocidade *= 0.4;
    applyMotors(-velocidade, velocidade);
  }
  applyMotors(0,0);
}

void Motion::stop()
{
  Motion::applyMotors(0, 0);
}

void Motion::setVelocity(int v) {
  speedRangeUs = constrain(v, min_velocity, max_velocity);
}

void Motion::calibrateStopMotors(int l, int r) {
  int vl, vr;
  vl = (l > 1700 || l < 1300) ? 1500 : l;
  vr = (r > 1700 || r < 1300) ? 1500 : r;
  leftStopUs = vl;
  rightStopUs = vr;
}


void Motion::customMove(int vl, int vr){
  int vleft = map(vl, -100, 100, -max_velocity, max_velocity);
  int vright = map(vr, -100, 100, -max_velocity, max_velocity);
  applyMotors(vleft, vright);
}