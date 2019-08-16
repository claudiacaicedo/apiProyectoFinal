const mongoose = require('mongoose');

const horarioSchema = mongoose.Schema({

    laboratorio: String,
    docente: String,
    materia: String,
    horaEntrada: String,
    horaSalida: String
       
}, {
    timestamps: true
});

module.exports = mongoose.model('Horarios', horarioSchema);