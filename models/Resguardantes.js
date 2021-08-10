const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resguardantesSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    },
    paterno: {
        type: String,
        trim: true
    },
    materno: {
        type: String,
        trim: true
    },
    usuario: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Resguardantes', resguardantesSchema);