const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const areasSchema = new Schema({
    nombre: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Areas', areasSchema);