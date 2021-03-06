var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost");
const mysql = require("mysql");
var moment = require("moment");

console.log("Se prendio node");
// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "ec2-52-90-24-61.compute-1.amazonaws.com",
  user: "root",
  password: "mysql", //el password de ingreso a mysql
  database: "smartpark",
  port: 3306,
});

client.on("connect", function () {
  client.subscribe("topico1", function (err) {
    if (err) {
      console.log("error en la subscripcion");
    }
  });
  console.log("connection init");
});

client.on("message", function (topic, message) {
  // message is Buffer
  json1 = JSON.parse(message.toString());

  let fechaHora = moment().format();
  let fkPark = json1.fk_data;
  let idCalle = json1.id_Calle;
  if (json1.process === 1) {
    let fecha = moment().format("YYYY/MM/DD");
    connection.getConnection(function (error, tempConn) {
      //conexion a mysql
      if (error) {
        //throw error; //en caso de error en la conexion
        console.log("Hubo un error", error);
      } else {
        console.log("Conexion correcta.");
        tempConn.query(
          "INSERT INTO dayresult VALUES(null, ?, ?, ?, ?, ?)",
          [fkPark, fecha, json1.PorcentajeOcu, json1.zona, json1.valores],
          function (error, result) {
            //se ejecuta la inserción
            if (error) {
              console.log("error al ejecutar el query");
              throw error;
            } else {
              tempConn.release();
              console.log("datos almacenados"); //mensaje de respuesta en consola
            }
          }
        );
      }
    });
  } else {
    // se itera cada json
    console.log("------------1");
    for (let i = 1; i <= json1.bucle; i++) {
      //Para obtener el objeto individual del json slot
      let parqueo = json1.slots[0][`${i}`];

      let res1 = parqueo.slot;
      let res2 = parqueo.estado;
      console.log("------------");

      //client.publish('topico2', 'mensaje recibido')
      connection.getConnection(function (error, tempConn) {
        //conexion a mysql
        if (error) {
          //throw error; //en caso de error en la conexion
          console.log("Hubo un error", error);
        } else {
          console.log("Conexion correcta.");
          tempConn.query(
            "INSERT INTO data VALUES(null, ?, ?, ?, ?, ?)",
            [idCalle, res1, res2, fechaHora, fkPark],
            function (error, result) {
              //se ejecuta la inserción
              if (error) {
                console.log("error al ejecutar el query");
                throw error;
              } else {
                tempConn.release();
                console.log("datos almacenados"); //mensaje de respuesta en consola
              }

              //client.end() //si se habilita esta opción el servicio termina
            }
          );
        }
      });
    }
  }
});
