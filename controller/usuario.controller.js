const express = require("express")
const mongoose = require("mongoose") 
const ruta = express.Router()
const udao = require("../model/usuario.models")
const usuarios = require("../bbdd/usuario.bbdd")

class UsuarioController{

    async findByUsernameAndPassword(req,res){
        const result = await udao.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if (!result)
            return res.status(404).send("El usuario o el password es incorrecto")

        return res.status(200).send(result)
    }

    async findByid(req,res) {
        try{
            const result = await udao.findById(req.params.id);

            if (!result)
                return res.status(404).send("El usuario o el password es incorrecto")

            return res.status(200).send(result);
        }catch(error){
            console.error("Error en cargaInicial de usuarios", error);
            return res.status(500).json({mensaje:"Error general"})
        }
    }

    // 🔹 REGISTER
    async register(req, res) {
        try {
            const nuevoUsuario = new udao(req.body);
            const usuarioGuardado = await nuevoUsuario.save();
            return res.status(201).send(usuarioGuardado);
        } catch (err) {
            console.error("Error en register de usuario", err);
            return res.status(500).json({ mensaje: "Error general" });
        }
    }

    // 🔹 UPDATE (el tuyo)
    async updateOne(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                return res.status(400).send("Id invalido");

            const usuarioActualizado = await udao.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            if (!usuarioActualizado)
                return res.status(404).send("Usuario no existe");

            return res.status(200).send(usuarioActualizado);

        } catch (err) {
            console.error("Error en updateOne de usuario", err);
            return res.status(500).json({mensaje: "Error general"});
        }
    }

    // 🔹 DELETE
    async deleteOne(req, res) {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id))
                return res.status(400).send("Id invalido");

            const usuarioEliminado = await udao.findByIdAndDelete(req.params.id);

            if (!usuarioEliminado)
                return res.status(404).send("Usuario no existe");

            return res.status(200).send("Usuario eliminado correctamente");

        } catch (err) {
            console.error("Error en deleteOne de usuario", err);
            return res.status(500).json({ mensaje: "Error general" });
        }
    }

    async cargaInicial(req,res) {
        try{
            await udao.insertMany(usuarios)
            return res.status(201).send("Carga completada")
        }catch(err){
            console.error("Error en cargaInicial de usuarios", err);
            return res.status(500).json({mensaje:"Error general"})
        }
    }
}

module.exports = new UsuarioController();
