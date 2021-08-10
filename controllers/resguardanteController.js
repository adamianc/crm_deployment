const Resguardantes = require('../models/Resguardantes');

// Nuevo resguardante
exports.nuevoResguardante = async (req, res, next) => {
    const resguardante = new Resguardantes(req.body);

    try {
        await resguardante.save();
        res.json({mensaje: 'Se agregó nuevo resguardante'});
    } catch (error) {
        res.send(error);
        next();
    }
}

// Mostrar todos los resguardantes
exports.mostrarResguardantes = async (req, res, next) => {
    try {
        const resguardantes = await Resguardantes.find({});
        res.json(resguardantes);
    } catch (error) {
        console.log(error);
        next();
    }
}

// Mostrar resguardante x id
exports.mostrarResguardante = async (req, res, next) => {
    const resguardante = await Resguardantes.findById(req.params.idResguardante);

    if (!resguardante) {
        res.json({mensaje: 'No existe resguardante'});
        next();
    }
    // Mostrar resguardante
    res.json(resguardante);
}

// Actualizar resguardante x id
exports.actualizarResguardante = async (req, res, next) => {
    try {
        const resguardante = await Resguardantes.findOneAndUpdate({_id : req.params.idResguardante},
        req.body, {
            new: true
        });
        res.json(resguardante);
    } catch (error) {
        res.send(error);
        next();
    }
}

// Eliminar resguardante x id
exports.eliminarResguardante = async (req, res, next) => {
    try {
        await Resguardantes.findOneAndDelete({_id : req.params.idResguardante});
        res.json({mensaje: 'El resguardante se ha eliminado'});
    } catch (error) {
        console.log(error);
        nextÇ();
    }
}