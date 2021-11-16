const express = require("express");
const app = express();
const morgan = require("morgan");

app.set("port", 3000);

app.use(morgan("dev"));
app.use(express.json());

app.use(require("./rutas/data.router.js"));
app.use(require("./rutas/parqueaderos.router.js"));
app.use(require("./rutas/dayResult.router.js"));

app.listen(app.get("port"), () => {
  console.log(`Servidor funcionando en ${app.get("port")}`);
});
