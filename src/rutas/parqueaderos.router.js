const { Router } = require("express");
const router = Router();
const mysql = require("mysql");

// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "ec2-52-90-24-61.compute-1.amazonaws.com",
  user: "root",
  password: "mysql", //el password de ingreso a mysql
  database: "smartpark",
  port: 3306,
});

//function get en la ruta /datos, que trae todos los datos almacenados en la tabla

router.get("/parqueaderos", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  var arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT * FROM parqueadero", function (error, result) {
        var resultado = result; //se almacena el resultado de la consulta en la variable resultado
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) {
            //se lee el resultado y se arma el json
            json1 = {
              id: resultado[i].id,
              nombre: resultado[i].nombre,
              ubicacion: resultado[i].ubicacion,
              cantidad: resultado[i].cantidad,
              tipo: resultado[i].tipo,
            };
            console.log(json1); //se muestra el json en la consola
            arreglo.push(json1); //se añade el json al arreglo
          }
          res.json(arreglo); //se retorna el arreglo
        }
      });
    }
  });
});

module.exports = router;
