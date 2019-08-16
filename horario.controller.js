const Horario = require('./horario.model.js');

//Create new Lab
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Este campo no debe estar vacio"
        });
    }

    // Create a Lab
    const horario = new Horario({
        laboratorio: req.body.nombre || "Sin nombre de Horario", 
        docente: req.body.docente,
        materia: req.body.materia,
        horaEntrada: req.body.horaEntrada,
        horaSalida: req.body.horaSalida
    });

    // Save Lab in the database
    horario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al guardar el Horario."
        });
    });
};

// Retrieve all labs from the database.
exports.findAll = (req, res) => {
    Horario.find()
    .then(horario => {
        res.send(horario);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al traer el Horario."
        });
    });
};

// Find a single lab with a labId
exports.findOne = (req, res) => {
    Horario.findById(req.params.horarioId)
    .then(horario => {
        if(!horario) {
            return res.status(404).send({
                message: "Horario no encontrado con el id " + req.params.horarioId
            });            
        }
        res.send(horario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "horario no encontrado con el id " + req.params.horarioId
            });                
        }
        return res.status(500).send({
            message: "Algo ocurrio con el id " + req.params.horarioId
        });
    });
};

// Update a lab
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "El campo no puede estar vacio"
        });
    }

    // Find and update lab with the request body
    Horario.findByIdAndUpdate(req.params.horarioId, {
        laboratorio: req.body.nombre || "Sin nombre de Horario", 
        docente: req.body.docente,
        materia: req.body.materia,
        horaEntrada: req.body.horaEntrada,
        horaSalida: req.body.horaSalida
        
    }, {new: true})
    .then(horario => {
        if(!horario) {
            return res.status(404).send({
                message: "Horario no encontrado con el id " + req.params.horarioId
            });
        }
        res.send(horario);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Laboratorio no encontrado con el id " + req.params.horarioId
            });                
        }
        return res.status(500).send({
            message: "Algo ocurrio actualizando con el id " + req.params.horarioId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Horario.findByIdAndRemove(req.params.horarioId)
    .then(horario => {
        if(!horario) {
            return res.status(404).send({
                message: "Lab not found with id " + req.params.horarioId
            });
        }
        res.send({message: "Lab deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Lab not found with id " + req.params.horarioId
            });                
        }
        return res.status(500).send({
            message: "Could not delete lab with id " + req.params.horarioId
        });
    });
};