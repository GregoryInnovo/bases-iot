#include <ArduinoJson.h>

int s1 = 4;
int s2 = 5;
int s3 = 6;
int s4 = 7;
int s5 = 8;

int apart1 = 0, apart2 = 0, apart3 = 0, apart4 = 0, apart5 = 0;

int apt1 = 0, apt2 = 0, apt3 = 0, apt4 = 0, apt5 = 0;

bool bloqueo = true;

const String id_Calle = "Calle6";
int ID_Park = 1;


// Slot;
int slot1, slot2, slot3, slot4, slot5;
//contadores
int contadorMin, contadorMin2, contadorMin3, contadorMin4, contadorMin5;
int contadorCar, contadorCar2, contadorCar3, contadorCar4, contadorCar5;

int auxContadorCar;
bool cb1, cb2, cb3, cb4, cb5;

// Porcetaje total
double porcentajeTotal;
int procesar;

void setup() {


  Serial.begin(9600);
  pinMode(s1, INPUT);
  pinMode(s2, INPUT);
  pinMode(s3, INPUT);
  pinMode(s4, INPUT);
  pinMode(s5, INPUT);

  // init
  slot1 = 1;
  slot2 = 2;
  slot3 = 3;
  slot4 = 4;
  slot5 = 5;
  contadorMin = 0;
  contadorCar = 0;
  contadorMin2 = 0;
  contadorCar2 = 0;
  contadorMin3 = 0;
  contadorCar3 = 0;
  contadorMin4 = 0;
  contadorCar4 = 0;
  contadorMin5 = 0;
  contadorCar5 = 0;


  auxContadorCar = 0;

  porcentajeTotal = 0;
  procesar = 0;

}

void loop() {
  // put your main code here, to run repeatedly:

  apart1 = digitalRead(s1);
  apart2 = digitalRead(s2);
  apart3 = digitalRead(s3);
  apart4 = digitalRead(s4);
  apart5 = digitalRead(s5);

  if (apart1 == HIGH && bloqueo == true) {
    apt1 = 1;
  }
  else {
    apt1 = 0;
  }
  if (apart2 == HIGH && bloqueo == true) {
    apt2 = 1;
  }
  else {
    apt2 = 0;
  }
  if (apart3 == HIGH && bloqueo == true) {
    apt3 = 1;
  }
  else {
    apt3 = 0;
  }
  if (apart4 == HIGH && bloqueo == true) {
    apt4 = 1;
  }
  else {
    apt4 = 0;
  }
  if (apart5 == HIGH && bloqueo == true) {
    apt5 = 1;
  }
  else {
    apt5 = 0;
  }


  contadorProcesar();



  Serial.println("{\"min1\" : " + String(contadorMin) + ", \"dato2\" : " + String(contadorCar) + "}");
  Serial.println("{\"min2\" : " + String(contadorMin2) + ", \"dato2\" : " + String(contadorCar2) + "}");
  Serial.println("{\"min3\" : " + String(contadorMin3) + ", \"dato2\" : " + String(contadorCar3) + "}");
  Serial.println("{\"min4\" : " + String(contadorMin4) + ", \"dato2\" : " + String(contadorCar4) + "}");
  Serial.println("{\"min5\" : " + String(contadorMin5) + ", \"dato2\" : " + String(contadorCar5) + "}");

  if (procesar == 1) {
    contadorMin = 400;
    contadorMin2 = 400;
    contadorMin3 = 400;
    contadorMin4 = 400;
    contadorMin5 = 400;
    CalcularPorcentajeOcu(contadorMin);
    CalcularPorcentajeOcu(contadorMin2);
    CalcularPorcentajeOcu(contadorMin3);
    CalcularPorcentajeOcu(contadorMin4);
    CalcularPorcentajeOcu(contadorMin5);
    double resultado = porcentajeTotal / slot5;
    contadorCar = 1;
    contadorCar2 = 2;
    contadorCar3 = 3;
    contadorCar4 = 4;
    contadorCar5 = 5;
    String valueCar = String(contadorCar) + "," + String(contadorCar2) + "," + String(contadorCar3) + "," + String(contadorCar4) + "," + String(contadorCar5);

    StaticJsonDocument<110> doc;

    doc["process"] = 1;
    doc["fkPark"] = ID_Park;
    doc["PorcentajeOcu"] = resultado;
    doc["zona"] = id_Calle;
    doc["valores"] = valueCar;
    serializeJson(doc, Serial);
    Serial.println();

  } else {
    StaticJsonDocument<335> doc;

    doc["process"] = 0;
    doc["bucle"] = slot5;
    doc["fk_data"] = ID_Park;
    doc["id_Calle"] = id_Calle;

    JsonObject slots_0 = doc["slots"].createNestedObject();

    JsonObject slots_0_1 = slots_0.createNestedObject("1");
    slots_0_1["slot"] = slot1;
    slots_0_1["estado"] = apt1;


    JsonObject slots_0_2 = slots_0.createNestedObject("2");
    slots_0_2["slot"] = slot2;
    slots_0_2["estado"] = apt2;

    JsonObject slots_0_3 = slots_0.createNestedObject("3");
    slots_0_3["slot"] = slot3;
    slots_0_3["estado"] = apt3;

    JsonObject slots_0_4 = slots_0.createNestedObject("4");
    slots_0_4["slot"] = slot4;
    slots_0_4["estado"] = apt4;

    JsonObject slots_0_5 = slots_0.createNestedObject("5");
    slots_0_5["slot"] = slot5;
    slots_0_5["estado"] = apt5;

    serializeJson(doc, Serial);
    Serial.println();
  }



  delay(2000);
  procesar = procesar + 1;
}

void contadorProcesar() {
  // contador Min y Car slot 1
  if (apt1 == 1) {
    contadorMin = contadorMin + 1;
    if (cb1 == true) {
      contadorCar = contadorCar + 1;
      cb1 = false;
    }
  } else {
    cb1 = true;
  }


  // contador Min y Car slot 2
  if (apt2 == 1) {
    contadorMin2 = contadorMin2 + 1;
    if (cb2 == true) {
      contadorCar2 = contadorCar2 + 1;
      cb2 = false;
    }
  } else {
    cb2 = true;
  }


  // contador Min y Car slot 3
  if (apt3 == 1) {
    contadorMin3 = contadorMin3 + 1;
    if (cb3 == true) {
      contadorCar3 = contadorCar3 + 1;
      cb3 = false;
    }
  } else {
    cb3 = true;
  }

  // contador Min y Car slot 4
  if (apt4 == 1) {
    contadorMin4 = contadorMin4 + 1;
    if (cb4 == true) {
      contadorCar4 = contadorCar4 + 1;
      cb4 = false;
    }
  } else {
    cb4 = true;
  }

  // contador Min y Car slot 5
  if (apt5 == 1) {
    contadorMin5 = contadorMin5 + 1;
    if (cb5 == true) {
      contadorCar5 = contadorCar5 + 1;
      cb5 = false;
    }
  } else {
    cb5 = true;
  }
}

void CalcularPorcentajeOcu(double contador) {
  double totalMin = 1440;
  double res = (contador * 100 ) / totalMin;
  porcentajeTotal = porcentajeTotal + res;

}
