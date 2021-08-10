const NoBreaks = require('../models/NoBreaks');

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

// Nuevo nobreak
exports.nuevoNoBreak = async (req, res, next) => {
    const nobreak = new NoBreaks(req.body);

    try {
        if (req.file.filename) {
            nobreak.imagen = req.file.filename
        }
        await nobreak.save();
        res.json({mensaje: 'Se agregó nuevo NoBreak'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los nobreaks
exports.mostrarNoBreaks = async (req, res, next) => {
    try {
        const nobreaks = await NoBreaks.find({}).populate('edificio').populate('area');
        res.json(nobreaks);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar noBreak x id
exports.mostrarNoBreak = async (req, res, next) => {
    const nobreak = await NoBreaks.findById(req.params.idNoBreak);

    if (!nobreak) {
        res.json({mensaje: 'No existe el noBreak'});
        next();
    }
    // mostrar nobreak
    res.json(nobreak);
}

// Actualizar NoBreak x id
exports.actualizarNoBreak = async (req, res, next) => {
    try {
        // Construir nuevo nobreak
        const nuevoNoBreak = req.body;

        // verificar si hay imagen nueva
        if (req.file) {
            nuevoNoBreak.imagen = req.file.filename;
        } else {
            const noBreakAnterior = await NoBreaks.findById(req.params.idNoBreak);
            nuevoNoBreak.imagen = noBreakAnterior.imagen;
        }
        const nobreak = await NoBreaks.findOneAndUpdate({_id : req.params.idNoBreak},
            req.body, {
                new: true
            });
            res.json(nobreak);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar nobreak x id
exports.eliminarNoBreak = async (req, res, next) => {
    try {
        await NoBreaks.findOneAndDelete({_id : req.params.idNoBreak});
        res.json({mensaje: 'Se ha elimiando el NoBreak'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Buscar NoBreak
exports.buscarNoBreak = async (req, res, next) => {
    try {
        // obtener query
        const { query } = req.params;
        const noBreak = await NoBreaks.find({ inventario: new RegExp(query, 'i') });
        res.json(noBreak);
    } catch (error) {
        console.log(error);
        next();
    }
}