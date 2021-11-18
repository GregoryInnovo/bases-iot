const { Router } = require("express");
const router = Router();
const mysql = require("mysql");

// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "localhost",
  user: "root",
  password: "root", //el password de ingreso a mysql
  database: "smartpark",
  port: 3306,
});

router.get("/dayresult", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  var arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT * FROM dayresult", function (error, result) {
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
              fkPark: resultado[i].fkPark,
              fecha: resultado[i].fecha,
              PorcentajeOcu: resultado[i].PorcentajeOcu,
              zona: resultado[i].zona,
              valores: resultado[i].valores,
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

router.get("/dayresult/demanda", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  var arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT fkPark, fecha, PorcentajeOcu, zona FROM dayresult", function (error, result) {
        var resultado = result; //se almacena el resultado de la consulta en la variable resultado
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) {
            //se lee el resultado y se arma el json
            json1 = {
              fkPark: resultado[i].fkPark,
              fecha: resultado[i].fecha,
              PorcentajeOcu: resultado[i].PorcentajeOcu,
              zona: resultado[i].zona,
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

router.get("/dayresult/circulacion", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  var arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT fkPark, fecha, valores, zona FROM dayresult", function (error, result) {
        var resultado = result; //se almacena el resultado de la consulta en la variable resultado
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) {
            //se lee el resultado y se arma el json
            json1 = {
              fkPark: resultado[i].fkPark,
              fecha: resultado[i].fecha,
              valores: resultado[i].valores,
              zona: resultado[i].zona,
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
