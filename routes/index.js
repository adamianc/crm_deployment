const express = require('express');
const router = express.Router();

const areaController = require('../controllers/areaController');
const edificioController = require('../controllers/edificioController');
const resguardanteController = require('../controllers/resguardanteController');
const monitorController = require('../controllers/monitorController');
const cpuController = require('../controllers/cpuController');
const nobreakController = require('../controllers/nobreakController');
const portatilController = require('../controllers/portatilController');
const resguardoController = require('../controllers/resguardoController');
const usuariosController = require('../controllers/usuariosController');

// Middleware protección de rutas
const auth = require('../middleware/auth');

module.exports = function() {
    
    // Áreas post, get, put, delete
    router.post('/areas', auth, areaController.nuevaArea);

    router.get('/areas', auth, areaController.mostrarAreas);

    router.get('/areas/:idArea', auth, areaController.mostrarArea);

    router.put('/areas/:idArea', auth, areaController.actualizarArea);

    router.delete('/areas/:idArea', auth, areaController.eliminarArea);

    // Edificios
    router.post('/edificios', auth, edificioController.nuevoEdificio);

    router.get('/edificios', auth, edificioController.mostrarEdificios);

    router.get('/edificios/:idEdificio', auth, edificioController.mostrarEdificio);

    router.put('/edificios/:idEdificio', auth, edificioController.actualizarEdificio);

    router.delete('/edificios/:idEdificio', auth, edificioController.eliminarEdificio);

    // Resguardantes
    router.post('/resguardantes', auth, resguardanteController.nuevoResguardante);

    router.get('/resguardantes', auth, resguardanteController.mostrarResguardantes);

    router.get('/resguardantes/:idResguardante', auth, resguardanteController.mostrarResguardante);

    router.put('/resguardantes/:idResguardante', auth, resguardanteController.actualizarResguardante);

    router.delete('/resguardantes/:idResguardante', auth, resguardanteController.eliminarResguardante);

    // Monitores

    // Busqueda monitor
    router.post('/monitores/busqueda/:query', monitorController.buscarMonitor);

    router.post('/monitores', 
    auth, 
    monitorController.subirArchivo,
    monitorController.nuevoMonitor
    );

    router.get('/monitores', auth, monitorController.mostrarMonitores);

    router.get('/monitores/:idMonitor', auth, monitorController.mostrarMonitor);

    router.put('/monitores/:idMonitor', 
    auth, 
    monitorController.subirArchivo,
    monitorController.actualizarMonitor
    );

    router.delete('/monitores/:idMonitor', auth, monitorController.eliminarMonitor);

    // CPUs
    router.post('/cpus', 
    auth, 
    cpuController.subirArchivo,
    cpuController.nuevoCPU
    );

    router.get('/cpus', auth, cpuController.mostrarCPUs);

    router.get('/cpus/:idCPU', auth, cpuController.mostrarCPU);

    router.put('/cpus/:idCPU', 
    auth, 
    cpuController.subirArchivo,
    cpuController.actualizarCPU
    );

    router.delete('/cpus/:idCPU', auth, cpuController.eliminarCPU);

    // Busqueda de CPUs
    router.post('/cpus/busqueda/:query', cpuController.buscarCPU);

    // NoBreaks
    router.post('/nobreaks', 
    auth, 
    nobreakController.subirArchivo,
    nobreakController.nuevoNoBreak
    );

    router.get('/nobreaks', auth, nobreakController.mostrarNoBreaks);

    router.get('/nobreaks/:idNoBreak', auth, nobreakController.mostrarNoBreak);

    router.put('/nobreaks/:idNoBreak', 
    auth, 
    nobreakController.subirArchivo,
    nobreakController.actualizarNoBreak
    );

    router.delete('/nobreaks/:idNoBreak', auth, nobreakController.eliminarNoBreak);

    // Busqueda de NoBreaks
    router.post('/nobreaks/busqueda/:query', nobreakController.buscarNoBreak);

    // Portatiles
    router.post('/portatiles', 
    auth, 
    portatilController.subirArchivo,
    portatilController.nuevaPortatil
    );

    router.get('/portatiles', auth, portatilController.mostrarPortatiles);

    router.get('/portatiles/:idPortatil', auth, portatilController.mostrarPortatil);

    router.put('/portatiles/:idPortatil', 
    auth, 
    portatilController.subirArchivo,
    portatilController.actualizarPortatil
    );

    router.delete('/portatiles/:idPortatil', auth, portatilController.eliminarPortatil);

    // Busqueda de Portatiles
    router.post('/portatiles/busqueda/:query', portatilController.buscarPortatil);

    // Resguardos
    router.post('/resguardos', auth, resguardoController.nuevoResguardo);

    router.get('/resguardos', auth, resguardoController.mostrarResguardos);

    router.get('/resguardos/:idResguardo', auth, resguardoController.mostrarResguardo);

    router.put('/resguardos/:idResguardo', auth, resguardoController.actualizarResguardo);

    router.delete('/resguardos/:idResguardo', auth, resguardoController.eliminarResguardo);

    // Usuarios
    router.post('/crear-cuenta', auth, usuariosController.registrarUsuario);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}

