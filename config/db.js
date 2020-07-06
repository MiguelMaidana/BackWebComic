const mongoose = require("mongoose")
require("dotenv").config({path:"../variables.env"})

const conectarDB = async()=>{
    try{

        await mongoose.connect("mongodb+srv://mono:mono34512744@cluster0-h6s4u.mongodb.net/CRMWebComic",{
            useNewUrlParser : true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex : true
        })
        
        console.log("DB conectada")

    }catch(error){
        console.log("Hubo un error")
        console.log(error)
        process.exit(1); //Detiene la aplicacion en caso de error
    }
}

module.exports = conectarDB;