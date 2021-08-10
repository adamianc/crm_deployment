const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const monitoresSchema = new Schema({
    marca: {
        type: String,
        trim: true
    },
    modelo: {
        type: String,
        trim: true
    },
    inventario_old: {
        type: String,
        unique: true
    },
    inventario: {
        type: String,
        unique: true
    },
    imagen: {
        type: String
    },
    edificio: {
        type: Schema.ObjectId,
        ref: 'Edificios'
    },
    area: {
        type: Schema.ObjectId,
        ref: 'Areas'
    },
    activo: {
        type: Boolean
    },
    estado: {
        type: String
    }
});

module.exports = mongoose.model('Monitores', monitoresSchema);