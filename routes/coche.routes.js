const express = require("express");
const ruta = express.Router();
const CocheModel = require("../model/coche.models");
const cocheController = require("../controller/coche.controllers");

ruta.get("/cargaInicial", cocheController.cargaInicial);
ruta.get("/", cocheController.findAll)
ruta.get("/marca/:marca", cocheController.findByMarca);
ruta.get("/precio/:precio", cocheController.findByPrecioGreaterThan);
ruta.get("/:id", cocheController.findByid);
ruta.post("/",cocheController.inserOne);
ruta.put("/:id", cocheController.updateOne)
ruta.delete("/:id", cocheController.deleteOne)

module.exports = ruta