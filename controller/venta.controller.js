const express = require("express")
//const mongoose = require("mongoose") 
const ruta = express.Router()
const vdao = require("../model/venta.models")
const cdao = require("../model/coche.models")
const udao = require("../model/usuario.models")
//const usuarios = require("../bbdd/usuario.bbdd")

class VentaController{

    async registro (req,res){
        try{

            const usuario = await udao.findById(req.body.idUsuario);
            if(!usuario)
                return res.status(404).send("Usuario no existe");
            const coche = await udao.findById(req.body.idUsuario);
            if(!coche)
                return res.status(404).send("Coche no existe");
            if(coche.isVendido)
                return res.satatus(400).send("Este coche esta vendido")
            const ventanueva = new cdao({
                usuario : {_id : usuario._id},
                coche:{_id : coche._id},
                precio: req.body.precio
            });
            const resultVenta = await ventanueva.save();
            cocheVenta.isVendido = true;

            const resultCoche = await coche.save();
            return res.status(201).json({mensaje: "Venta registrada", resultVenta});
           // const usuario = req.body;
           // const usuarioNuevo = new udao(usuario);
           // const result = awair usuarioNuevo.save();
        }
        catch(err){

            console.error("Error de insertOne de usuario", err)
            return res.status(500).json({mensaje: "Error interno"})

        }
    }

    

}


module.exports = new VentaController();