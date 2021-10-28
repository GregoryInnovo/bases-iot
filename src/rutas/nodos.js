const { Router } = require("express");
const router = Router();
const mysql = require("mysql");

// se crea la conexión a mysql
const connection = mysql.createPool({
  connectionLimit: 500,
  host: "localhost",
  user: "root",
  password: "", //el password de ingreso a mysql
  database: "smartpark",
  port: 3306,
});

//function get en la ruta /datos, que trae todos los datos almacenados en la tabla

router.get("/nodos", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  var arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT * FROM data", function (error, result) {
        var resultado = result; //se almacena el resultado de la consulta en la variable resultado
        if (error) {
          throw error;
          res.send("error en la ejecución del query");
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) {
            //se lee el resultado y se arma el json
            json1 = {
              "id_Calle": resultado[i].id_Calle,
              "slot": resultado[i].slot,
              "estado": resultado[i].estado,
              "fechaHora": resultado[i].fechaHora,
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

router.get("/nodos/:nodo", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
  var arreglo = []; //variable para almacenar todos los datos, en formato arreglo de json
  var nodo = req.params.nodo;

  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //si no se pudo conectar
    } else {
      console.log("Conexion correcta.");
      //ejecución de la consulta
      tempConn.query("SELECT * FROM nodos where idnodo=?", [nodo], function (error, result) {
        var resultado = result; //se almacena el resultado de la consulta en la variable resultado
        if (error) {
          res.send("error en la ejecución del query");
          throw error;
        } else {
          tempConn.release(); //se librea la conexión
          for (i = 0; i < resultado.length; i++) {
            //se lee el resultado y se arma el json
            json1 = {
              "idnodo": resultado[i].idnodo,
              "latitud": resultado[i].latitud,
              "longitud": resultado[i].longitud,
              "descripcion": resultado[i].descripcion,
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

//función post en la ruta /datos que recibe datos
router.post("/nodos", (req, res) => {
  console.log(req.body); //mustra en consola el json que llego
  json1 = req.body; //se almacena el json recibido en la variable json1
  connection.getConnection(function (error, tempConn) {
    //conexion a mysql
    if (error) {
      throw error; //en caso de error en la conexion
    } else {
      console.log("Conexion correcta.");
      tempConn.query(
        "INSERT INTO nodos VALUES(?,?,?,?)",
        [json1.idnodo, json1.latitud,    json1.longitud, json1.descripcion],
        function (error, result) {
          //se ejecuta lainserción
          if (error) {
            throw error;
            res.send("error al ejecutar el query");
          } else {
            tempConn.release();
            res.send("datos almacenados"); //mensaje de respuesta
          }
        }
      );
    }
  });
});

//función post en la ruta /datos que recibe datos
router.put("/nodos/:nodo", (req, res) => {
    console.log(req.body); //mustra en consola el json que llego
    var nodo = req.params.nodo;
    json1 = req.body; //se almacena el json recibido en la variable json1
    connection.getConnection(function (error, tempConn) {
      //conexion a mysql
      if (error) {
        throw error; //en caso de error en la conexion
      } else {
        console.log("Conexion correcta.");
        tempConn.query(
          "UPDATE nodos SET latitud=?, longitud=?, descripcion=? WHERE idnodo=?",
          [json1.latitud, json1.longitud, json1.descripcion, nodo],
          function (error, result) {
            //se ejecuta la inserción
            if (error) {
              throw error;
              res.send("error al ejecutar el query");
            } else {
              tempConn.release();
              res.send("datos modificados"); //mensaje de respuesta
            }
          }
        );
      }
    });
  });

//función post en la ruta /datos que recibe datos
router.delete("/nodos/:nodo", (req, res) => {
    console.log(req.body); //mustra en consola el json que llego
    var nodo = req.params.nodo;
    json1 = req.body; //se almacena el json recibido en la variable json1
    connection.getConnection(function (error, tempConn) {
      //conexion a mysql
      if (error) {
        throw error; //en caso de error en la conexion
      } else {
        console.log("Conexion correcta.");
        tempConn.query(
          "DELETE FROM nodos WHERE idnodo=?",
          [nodo],
          function (error, result) {
            //se ejecuta lainserción
            if (error) {
              throw error;
              res.send("error al ejecutar el query");
            } else {
              tempConn.release();
              res.send("nodo eliminado"); //mensaje de respuesta
            }
          }
        );
      }
    });
  });

module.exports = router;
