const Monitores = require('../models/Monitores');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato No Válido'))
        }
    },
}

// pasa la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if (error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

// Nuevo monitor
exports.nuevoMonitor = async (req, res, next) => {
    const monitor = new Monitores(req.body);

    try {
        if (req.file.filename) {
            monitor.imagen = req.file.filename
        }
        await monitor.save();
        res.json({mensaje: 'Se agregó nuevo monitor'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los monitores
exports.mostrarMonitores = async (req, res, next) => {
    try {
        const monitores = await Monitores.find({}).populate('edificio').populate('area');
        res.json(monitores);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar monitor x id
exports.mostrarMonitor = async (req, res, next) => {
        const monitor = await Monitores.findById(req.params.idMonitor);

        if (!monitor) {
            res.json({mensaje: 'No existe el monitor'});
            next();
        }
        // Mostrar monitor
        res.json(monitor);
}

// Actualizar monitor x id
exports.actualizarMonitor = async (req, res, next) => {
    try {

        // Construir nuevo monitor
        const nuevoMonitor = req.body;

        // veridicar si hay imagen
        if (req.file) {
            nuevoMonitor.imagen = req.file.filename;
        } else {
            const monitorAnterior = Monitores.findById(req.params.idMonitor);
            nuevoMonitor.imagen = monitorAnterior.imagen
        }
        
        const monitor = await Monitores.findOneAndUpdate({_id : req.params.idMonitor},
            req.body, {
                new: true
            });
            res.json(monitor);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar monitor x ID
exports.eliminarMonitor = async (req, res, next) => {
    try {
        await Monitores.findOneAndDelete({_id : req.params.idMonitor});
        res.json({mensaje: 'Se eliminó el monitor'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Buscar Monitor
exports.buscarMonitor = async (req, res, next) => {
    try {
        // obtener query
        const { query } = req.params;
        const monitor = await Monitores.find({ inventario: new RegExp(query, 'i') });
        res.json(monitor);
    } catch (error) {
        console.log(error);
        next();
    }
}