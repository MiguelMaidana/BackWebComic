const Usuario = require("../models/Usuario")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config({path:"../variables.env"})

const crearToken =(usuario,secreta,expiresIn)=>{
    
    const {id,email,nombre} = usuario
    return jwt.sign({id,email,nombre},secreta,{expiresIn})
}

//Resolvers

const resolvers = {
    Query: {
        obtenerUsuario : async (_,{token})=>{
            const usuarioId = await jwt.verify(token,"palabrasecreta")

            return usuarioId

        }
    },

    Mutation :{
        nuevoUsuario : async (_,{ input })=>{

            const {email,password} = input

            // revisar si el Usuario ya esta registrado

            const existeUsuario = await Usuario.findOne({email})
            if(existeUsuario){
                throw new Error ( "El usuario ya se encuentra registrado")
            }

            //Hashear el password
            const salt = await bcryptjs.genSalt(10);
            input.password = await bcryptjs.hash(password,salt);


            // Guardar en la BD

            try{
                const usuario = new Usuario(input)
                usuario.save() // Guardamos en la BD
                return usuario
            }catch(error){
                console.log(error)
            }

        },

        autenticarUsuario : async (_,{input})=>{
            
            const {email,password} = input 

            // Revisar si el usuario Existe

            const existeUsuario = await Usuario.findOne({email});
            if(!existeUsuario){
                throw new Error ( "El usuario no se  encuentra registrado")
            }

            //Revisar si el password es correcto

            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto){
                throw new Error ( "El password es incorrecto")

            }


            //Crear el Token 

            return {
                token : crearToken(existeUsuario,"palabrasecreta","48h")
            }

            
        }
    }

}

module.exports = resolvers;