const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const edificiosSchema = new Schema({
    nombre: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Edificios', edificiosSchema);