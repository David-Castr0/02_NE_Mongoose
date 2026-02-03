const express = require("express")
const mongoose = require("mongoose")
const app = express()
const bodyParser = require("body-parser")
const rutacoches = require("./routes/coche.routes")
const rutausuario = require("./routes/usuario.routes")
const rutaVentas = require("./routes/venta.routes")


//Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api/coches", rutacoches)
app.use("/api/usuario", rutausuario)
app.use("/api/venta", rutaVentas)


app.get("/", (req,res) =>{

    res.status(200).send("OK")

})

mongoose.connect("mongodb://127.0.0.1:27017/bbdd-coches-2526")
    .then(() => console.log("Mongodb conectado"))
    .catch(() => console.log("Mongodb No conectado"))

app.listen(3000, () => console.log("Node arrancadopor el puerto 3000"))
