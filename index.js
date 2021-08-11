const express = require('express');
require('dotenv').config({path: 'variables.env'});
const routes = require('./routes');
const mongoose = require('mongoose');

// CORS intercambio de recursos
const cors = require('cors');

// Conectar BD Mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// crear el servidor
const app = express();

// carpeta publica
app.use(express.static('uploads'));

// habilitar bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configurar cabeceras y cors
app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', 'https://sleepy-torvalds-009842.netlify.app');    
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
    
    });

// Definir un dominio(s) para recibir las peticiones
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // Revisar si la petición viene del whiteList
        const existe = whiteList.some( dominio => dominio === origin );
        if (existe) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

// Habilitar CORS
app.use(cors());

// Rutas de la app
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Iniciar app
app.listen(port, host, () => {
    console.log('el servidor está funcionando');
});