#include <ESP32Servo.h>
#include <Wire.h>

#define MPU_ADDR 0x68
#define MIN_VELOCITY 50
#define MAX_VELOCITY 450

static const int PIN_SERVO_LEFT = 4;
static const int PIN_SERVO_RIGHT = 5;

class Motion {
private:
  int min_velocity = 50;
  int max_velocity = 450;
  Servo servoLeft;
  Servo servoRight;
  float gyroBiasZ = 0;
  float Kp = 2.0;
  bool invertLeft = false;
  bool invertRight = true;
  int speedRangeUs = 250;
  int leftStopUs = 1500;
  int rightStopUs = 1500;
  int currentLeftVelocity = 0;
  int currentRightVelocity = 0;
  void calibrarGyro();
  void applyMotors(int left, int right);

public:
  Motion(bool invertLeft = false, bool invertRight = true);
  void begin();
  void move(int timeMs, bool dir);
  void turn(float angle);
  void stop();
  void calibrateStopMotors(int leftStopUs, int rightStopUs);
  void customMove(int vl, int vr);
  void setVelocity(int vel);
  int getVelocity();

};