const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resguardosSchema = new Schema({
    resguardante: {
        type: Schema.ObjectId,
        ref: 'Resguardantes'
    },
    cpus: [{
        cpu: {
            type: Schema.ObjectId,
            ref: 'Cpus'
        }
    }],
    monitores: [{
        monitor: {
            type: Schema.ObjectId,
            ref: 'Monitores'
        }
    }],
    portatiles: [{
        portatil: {
            type: Schema.ObjectId,
            ref: 'Portatiles'
        }
    }],
    nobreaks: [{
        nobreak: {
            type: Schema.ObjectId,
            ref: 'NoBreaks'    
        }
    }]
});

module.exports = mongoose.model('Resguardos', resguardosSchema);