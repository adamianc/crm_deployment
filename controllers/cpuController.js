const Cpus = require('../models/Cpus');

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

// Nuevo CPU
exports.nuevoCPU = async (req, res, next) => {
    const cpu = new Cpus(req.body);

    try {
        if (req.file.filename) {
            cpu.imagen = req.file.filename
        }
        await cpu.save();
        res.json({mensaje: 'Se agregó nuevo CPU'});
    } catch (error) {
        res.send(error);
        next();
    }
}

// Mostrar todos los CPUs
exports.mostrarCPUs = async (req, res, next) => {
    try {
        const cpus = await Cpus.find({}).populate('edificio').populate('area');
        res.json(cpus);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar CPU x ID
exports.mostrarCPU = async (req, res, next) => {
    const cpu = await Cpus.findById(req.params.idCPU);
    // const cpu = await Cpus.findById(req.params.idCPU).populate('edificio').populate('area');

    if (!cpu) {
        res.json({mensaje: 'No existe CPU'});
        next();
    }
    // Mostrar CPU
    res.json(cpu);
}

// Actualizar CPU
exports.actualizarCPU = async (req, res, next) => {
    try {
        
        // construir nuevo cpu
        let nuevoCPU = req.body;

        // verificar si hay imagen nueva
        if (req.file) {
            nuevoCPU.imagen = req.file.filename;
        } else {
            let cpuAnterior = await Cpus.findById(req.params.idCPU);
            nuevoCPU.imagen = cpuAnterior.imagen;
        }

        let cpu = await Cpus.findOneAndUpdate({_id : req.params.idCPU},
            nuevoCPU, {
                new: true
            });
            res.json(cpu);
    } catch (error) {
        res.send(error);
        next();
    }
}

// Eliminar CPU x ID
exports.eliminarCPU = async (req, res, next) => {
    try {
        await Cpus.findOneAndDelete({_id : req.params.idCPU});
        res.json({mensaje: 'Se ha eliminado el CPU'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Buscar CPUs
exports.buscarCPU = async (req, res, next) => {
    try {
        // obtener query
        const { query } = req.params;
        const cpu = await Cpus.find({ nombre: new RegExp(query, 'i') });
        res.json(cpu);
    } catch (error) {
        console.log(error);
        next();
    }
}