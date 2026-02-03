const express = require("express")
const ruta = express.Router()
const cdao = require("../model/coche.models")
const coches = require("../bbdd/coche.bbdd")
const mongoose = require("mongoose")    

const deleteOne = async (req,res) =>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send("Id invalido");
        
    const coche = req.body;
    const cocheActualizado = await cdao.findByIdAndDelete(req.params.id)
    if(!cocheActualizado)
        return res.status(404).send("Coche no existe")

    return res.status(200).send(cocheActualizado)

    } catch(err){
        console.error("error en deleteOne de coche", err)
        return res.status(291).send("Coche eliminado")
    }
}

const updateOne = async (req,res) =>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send("Id invalido");

    const coche = req.body;
    const cocheActualizado = await cdao.findByIdAndUpdate(req.params.id, coche, {new:true, runValidators:true})
    if(!cocheActualizado)
        return res.status(404).send("Coche no existe")

    return res.status(200).send(cocheActualizado)

    } catch(err){
        console.error("error en updateOne de coche", err)
        return res.status(291).send(result)
    }
}


const inserOne = async (req,res) =>{
    try {
        const coche = req.body;
        const cocheNuevo = new cdao(coche);
        const result = await cocheNuevo.save();
        return res.status(201).send(result)
    }
    catch(err){
        console.error("error en insertOne de coche", err)
        return res.status(500).json({mensaje: "Error interno"})
    }
}

const findByid = async (req,res) => {
    try{
        const result = await cdao.findById(req.params.id);
        return res.status(200).send(result)
    }catch(error){
        return res.status(500).send("Coche no existe")
    }
    
}

const findByPrecioGreaterThan = async (req,res) => {
    const result = await cdao.find({precio: {$gt: req.params.precio}});
    return res.status(200).send(result)
}


const findByMarca = async (req,res) => {
    const result = await cdao.find({marca: req.params.marca});
    return res.status(200).send(result)
}


const findAll = async (req,res) => {
    result = await cdao.find();
    return res.status(200).send(result)
}

const cargaInicial = async (req,res) => {

    cdao.insertMany(coches)
    return res.status(201).send("Carga finalizada")
}


module.exports = {
    cargaInicial,
    findAll,
    findByMarca,
    findByPrecioGreaterThan,
    findByid,
    inserOne,
    updateOne,
    deleteOne,
}