// REQUERIMOS EL MODULO DE EXPRESS
const express = require('express');

// MODULO DE CORS PERMITE QUE SE PUEDAN SOLICITAR RECURSOS DESDE UN DOMINIO DIFERENTE QUE SIRVIÓ EL PRIMER RECURSO (EN ESTE CASO EN EL LOCALHOST), TAMBIEN NOS SIRVE PARA PROTEGER UN SERVIDOR WEB DEL ACCESO DE OTRO SERVIDOR WEB
const cors = require('cors');

// BODY PARSER PERMITE A EXPRESS LEER EL CUERPO DE LOS DATOS Y LUEGO ANALIZARLO EN UN OBJETO JSON QUE PODAMOS ENTENDER 
const bodyParser = require('body-parser');

// dotenv para el archvo .env con las variables de entorno (seguridad, para que cuando vayamos a subir el codigo a github por ejemplo, no se suba esa informacion)
require('dotenv').config();

// MONGOOSE ES UNA LIBRERIA DE NODE JS, NOS PERMITE DEFINIR UN ESQUEMA , UNA VEZ DEFINIDO EL ESQUEMA MONGOOSE PERMITE CREAR UN MODELO BASADO EN UN ESQUEMA EN ESPECIFICO Y UN ESQUEMA ES UNA ESTRUCTURA JSON QUE CONTIENE INFORMACIÓN DE LAS PROPIEDADES DE UN DOCUMENTO (MONGODB)
const mongoose = require('mongoose');
 
// REQUERIMOS EL MIDDLEWARE EXPRESS.ROUTER (ESTA CONTIENE RUTAS QUE SE DEFINEN PARA LOS METODOS COMO LO SON; GET, POST, ETC)
const routesTasks = require('./routes/tasksRoutes')

// DEFINIMOS EXPRESS EN UNA CONSTANTE LLAMADA APP
const app = express();

// DEFINIMOS EL PUERTO
const port = 9000

// permite que se puedan solicitar recursos restringidos en una página web desde un dominio diferente del dominio que sirvió el primer recurso en este caso React(puerto 3000) a Node js (puerto 8080 y 4000)
app.use(cors())

// configuracion de bodyParser para acceder a la informacion de las peticiones
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use("/tasks", routesTasks);

// app.get('/', (req,res)=>{
//     res.send("welcome to my api")
// })

// MONGO DB ATLAS
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{console.log("connected to mongodb atlas")})
    .catch((error)=> console.error(error))


app.listen(port, ()=>{
    console.log("server listening on port: ", port);
    
})