const express = require("express");
const ruta = express.Router();
const usuarioController = require("../controller/usuario.controller");

ruta.get("/cargaInicial", usuarioController.cargaInicial)
ruta.post("/login", usuarioController.findByUsernameAndPassword)
ruta.get("/:id", usuarioController.findByid)

module.exports = ruta;