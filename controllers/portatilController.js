const Portatiles = require('../models/Portatiles');

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

// Nueva portatil
exports.nuevaPortatil = async (req, res, next) => {
    const portatil = new Portatiles(req.body);

    try {
        if (req.file.filename) {
            portatil.imagen = req.file.filename
        }
        await portatil.save();
        res.json({mensaje: 'Se agregó nueva portatil'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todas las portatiles
exports.mostrarPortatiles = async (req, res, next) => {
    try {
        const portatiles = await Portatiles.find({});
        res.json(portatiles);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar portatil x id
exports.mostrarPortatil = async (req, res, next) => {
    const portatil = await Portatiles.findById(req.params.idPortatil);

    if (!portatil) {
        res.json({mensaje: 'No existe el portatil'});
        next();
    }
    // Mostrar portatil
    res.json(portatil);
}

// Actualizar portatil x id
exports.actualizarPortatil = async (req, res, next) => {
    try {
        // Construir nuevo portatil
        const nuevoPortatil = req.body;

        // Verificar si hay imagen nueva
        if (req.file) {
            nuevoPortatil.imagen = req.file.filename;
        } else {
            const portatilAnterior = await Portatiles.findById(req.params.idPortatil);
            nuevoPortatil.imagen = portatilAnterior.imagen;
        }
        
        const portatil = await Portatiles.findOneAndUpdate({_id : req.params.idPortatil}, 
        req.body, {
            new: true
        });
        res.json(portatil);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar portatil x id
exports.eliminarPortatil = async (req, res, next) => {
    try {
        await Portatiles.findOneAndDelete({_id : req.params.idPortatil});
        res.json({mensaje: 'Se ha eliminado el portatil'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Buscar Portatiles
exports.buscarPortatil = async (req, res, next) => {
    try {
        // obtener query
        const { query } = req.params;
        const portatil = await Portatiles.find({ nombre: new RegExp(query, 'i') });
        res.json(portatil);
    } catch (error) {
        console.log(error);
        next();
    }
}