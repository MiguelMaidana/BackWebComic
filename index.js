const {ApolloServer} = require("apollo-server")
const typeDefs = require("./db/schema")
const resolvers = require("./db/resolvers")

const conectarDB = require("./config/db")

//Conectar a la BD

conectarDB()



//servidor
const server = new ApolloServer({
    typeDefs,
    resolvers
  
})

// Comenzar  el servidor 

server.listen().then(({url})=>{
    console.log(`Servidor listo en la URL ${url}`)
})