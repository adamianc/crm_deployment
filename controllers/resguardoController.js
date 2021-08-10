const Resguardos = require('../models/Resguardos');

// Nuevo resguardo
exports.nuevoResguardo = async (req, res, next) => {
    const resguardo = new Resguardos(req.body);

    try {
        await resguardo.save();
        res.json({mensaje: 'Se ha agregado el nuevo resguardo'});
    } catch (error) {
        res.send(error);
        next();
    }
}

// mostrar todos los resguardos
exports.mostrarResguardos = async (req, res, next) => {
    try {
        const resguardos = await Resguardos.find({})
            .populate('resguardante')
            .populate({
                path: 'cpus.cpu'
            })
            .populate({
                path: 'monitores.monitor'
                // populate: {path: 'monitores.monitor.edificio'}
            })
            .populate({
                path: 'portatiles.portatil'
            })
            .populate({
                path: 'nobreaks.nobreak'
            })
        ;
        res.json(resguardos);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar resguardo x id
exports.mostrarResguardo = async (req, res, next) => {
    const resguardo = await Resguardos.findById(req.params.idResguardo);

    if (!resguardo) {
        res.json({mensaje: 'No existe el resguardo'});
        next();
    }
    // Mostrar resguardo
    res.json(resguardo);
}

// Actualizar resguardo x id
exports.actualizarResguardo = async (req, res, next) => {
    try {
        const resguardo = await Resguardos.findByIdAndUpdate({_id : req.params.idResguardo},
        req.body, {
            new: true
        });
        res.json(resguardo);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Eliminar resguardo por id
exports.eliminarResguardo = async (req, res, next) => {
    try {
        await Resguardos.findOneAndDelete({_id : req.params.idResguardo});
        res.json({mensaje: 'Se ha eliminado el resguardo'});
    } catch (error) {
        console.log(error);
        next();
    }
}