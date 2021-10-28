const { Router } = require("express");
const router = Router();
let temperatura; // se pueden declarar variables globales para ser usadas en el get y en el post
router.get("/", (req, res) => {
  let json2 = { t: temperatura };

  res.json(json2);
});
router.post("/", (req, res) => {
  console.log(req.body);
  let json1 = req.body; //se almacena el json recibido en una variable
  temperatura = json1.temperatura; //de esta manera se pueden obtener los datos del json
  res.send("datos recibidos....");
});

module.exports = router;
