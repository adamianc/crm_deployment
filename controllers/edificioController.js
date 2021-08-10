const Edificios = require('../models/Edificios');

// nuevo edificio
exports.nuevoEdificio = async (req, res, next) => {
    const edificio = new Edificios(req.body);

    try {
        await edificio.save();
        res.json({mensaje: 'Se agresgó nuevo edificio'});
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar todos los edificios
exports.mostrarEdificios = async (req, res, next) => {
    try {
        const edificios = await Edificios.find({});
        res.json(edificios);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar edificio x ID
exports.mostrarEdificio = async (req, res, next) => {
    const edificio = await Edificios.findById(req.params.idEdificio);

    if(!edificio) {
        res.json({mensaje: 'No existe el edificio'});
        next();
    }
    // Mostrar edificio
    res.json(edificio);
}

// Actualizar edificio x id
exports.actualizarEdificio = async (req, res, next) => {
    try {
        const edificio = await Edificios.findOneAndUpdate({_id : req.params.idEdificio},
            req.body, {
                new: true
            });
            res.json(edificio);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar edificio x id
exports.eliminarEdificio = async (req, res, next) => {
    try {
        await Edificios.findOneAndDelete({_id : req.params.idEdificio});
        res.json({mensaje: 'El edificio se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}