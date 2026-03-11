#include "display.h"

void initDisplay() {
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3c)) {
    Serial.println(F("SSD1306 allocation failed"));
  }
  display.clearDisplay();

}

void drawHeader() {
  display.clearDisplay();
  display.setTextSize(1);      // Normal 1:1 pixel scale
  display.setTextColor(SSD1306_WHITE); // Draw white text
  display.setCursor(0, 4);     // Start at top-left corner
  display.cp437(true);         // Use full 256 char 'Code Page 437' font
  display.write("192.168.1.50");
  display.drawBitmap(110, 0, WIFI_ICON, 16, 16, 1 );
  display.display();
}

void drawCalibrationScreen() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.write("Robot-flow");
  display.setTextSize(1);
  display.setCursor(0, 30);
  display.println("Calibrando sensores..");
  display.println("Nao mexa o robo");
  display.display();
  
}

void drawWaitingConnection(String ip) {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.write("Robot-flow");
  display.drawBitmap(110, 0, WIFI_ICON, 16, 16, 1 );
  display.setCursor(0, 30);
  display.print("IP ");
  display.println(ip);
  display.println("Aguardando conexao");
  display.display();
}

void drawRunningRoutine() {
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.write("Robot-flow");
  display.drawBitmap(110, 0, WIFI_ICON, 16, 16, 1 );
  display.setCursor(0, 20);
  display.setTextSize(2);
  display.setTextColor(SSD1306_BLACK, SSD1306_WHITE);
  display.write("Executando");
  display.setCursor(20, 40);
  display.write("programa");
  display.display();
}

void drawConnected() {
  display.clearDisplay();
  display.setTextSize(2);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.write("Robot-flow");
  display.setTextSize(2);
  display.setCursor(0, 24);
  display.println("Conectado");
  display.display();
}
