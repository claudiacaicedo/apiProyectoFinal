const mongoose = require('mongoose');

const horaSchema = mongoose.Schema({

    laboratorio: String,
    docente: String,
    materia: String,
    horaEntrada: String,
    horaSalida: String
       
}, {
    timestamps: true
});

module.exports = mongoose.model('Horas', horaSchema);