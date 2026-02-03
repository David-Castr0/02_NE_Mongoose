const express = require("express");
const ruta = express.Router();
const ventaController = require("../controller/venta.controller");



ruta.post("/", ventaController.registro);

module.exports = ruta;