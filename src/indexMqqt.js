var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost");
const mysql = require("mysql");
var moment = require("moment");

console.log("Se prendio node");
// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "localhost",
  user: "root",
  password: "", //el password de ingreso a mysql
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
  if (json1.process === 1) {
    console.log("Se procesan datos");
  } else {
    // se itera cada json
    for (let i = 1; i <= json1.bucle; i++) {
      
      //Para obtener el objeto individual del json slot
      var parqueo = json1.slots[0][`${i}`];

      
      // console.log(parqueo.id_Calle)
      // console.log("------------")


      //client.publish('topico2', 'mensaje recibido')
      connection.getConnection(function (error, tempConn) {
        //conexion a mysql
        if (error) {
          //throw error; //en caso de error en la conexion
          console.log("Hubo un error", error)
        } else {
          console.log("Conexion correcta.");
          tempConn.query(
            "INSERT INTO data VALUES(null, ?, ?, ?, ?, ?)",
            [
              parqueo.id_Calle,
              parqueo.slot,
              parqueo.estado,
              fechaHora,
              parqueo.fk_data,
            ],
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

  /*
   */
});
