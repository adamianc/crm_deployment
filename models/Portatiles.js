const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const portatilesSchema = new Schema({
    nombre: {
        type: String,
        unique: true
    },
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
    procesador: {
        type: String,
        trim: true
    },
    ram: {
        type: Number
    },
    hdd: {
        type: Number
    },
    os: {
        type: String,
        trim: true
    },
    licencia: {
        type: String,
        trim: true
    },
    office: {
        type: String,
        trim: true
    },
    office_lic: {
        type: Boolean
    },
    antivirus: {
        type: String,
        trim: true
    },
    ip: {
        type: String,
        unique: true
    },
    macaddress: {
        type: String,
        lowercase: true,
        unique: true
    },
    activo: {
        type: Boolean
    },
    edificio: {
        type: Schema.ObjectId,
        ref: 'Edificios'
    },
    area: {
        type: Schema.ObjectId,
        ref: 'Areas'
    },
    estado: {
        type: String
    }
});

module.exports = mongoose.model('Portatiles', portatilesSchema);