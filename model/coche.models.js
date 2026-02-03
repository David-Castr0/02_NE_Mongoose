const mongoose = require("mongoose")

const cocheSchema = new mongoose.Schema({
    marca: {
        type: String,
        require: true
    },
    modelo: {
        type: String,
        require: true
    },
    precio: Number,
    anio: {
        type: Number,
        require: true, 
        min: 2000
    },

    isVendido:{
        type:Boolean,
        default: false,

    },

    extras: {String}

},
{
    versionKey: false,
    timestamps: true
})

const Coche = mongoose.model("coche", cocheSchema)
module.exports = Coche
