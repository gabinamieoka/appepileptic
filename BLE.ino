#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#define SERVICE_UUID        "e8209c94-f39c-44ae-84c3-bc353474f010"
#define CHARACTERISTIC_UUID "b8f28f7d-0cc5-4187-9865-b6e8c0a7d3fd"

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
      Serial.println("Device connected");
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
      Serial.println("Device disconnected");
    }
};

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE work!");

  BLEDevice::init("myESP32");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_READ |
                      BLECharacteristic::PROPERTY_WRITE |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );

  String value = "1234"; // Enviar valor como string
  pCharacteristic->setValue(value.c_str());

  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("Characteristic defined! Now you can read it on your phone!");
}

void loop() {
  if (deviceConnected) {
     // Gerar um valor aleatório entre 0 e 29
  int randomValue = random(30);
  
  // Converter o valor aleatório para string
  String randomString = String(randomValue);
  
    pCharacteristic->setValue(randomString.c_str());
    pCharacteristic->notify();
    Serial.println("Notified characteristic value");
  }
  delay(2000);
