const mongoose = require('mongoose');

const LabSchema = mongoose.Schema({

    nombre: String,
    descripcion: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Labs', LabSchema);