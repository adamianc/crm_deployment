const Areas = require('../models/Areas');

// nueva área
exports.nuevaArea = async (req, res, next) => {
    const area = new Areas(req.body);

    try {
        await area.save();
        res.json({mensaje: 'Se agregó nueva área'});
    } catch (error) {
        res.send(error);
        next();
    }
}

// Mostrar todas las áreas
exports.mostrarAreas = async (req, res, next) => {
    try {
        const areas = await Areas.find({});
        res.json(areas);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar área x ID
exports.mostrarArea = async (req, res, next) => {
    const area = await Areas.findById(req.params.idArea);
    
    if(!area) {
        res.json({mensaje: 'No existe el área'});
        next()
    }
    // mostrar área
    res.json(area);
}

// Actualizar área x ID
exports.actualizarArea = async (req, res, next) => {
    try {
        const area = await Areas.findOneAndUpdate({_id : req.params.idArea}, 
        req.body, {
            new: true
        });
        res.json(area);
    } catch (error) {
        res.send(error);
        next();
    }
}

// Eliminar área x ID
exports.eliminarArea = async (req, res, next) => {
    try {
        await Areas.findOneAndDelete({_id : req.params.idArea});
        res.json({mensaje: 'El área se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}