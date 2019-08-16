const Lab = require('./lab.model.js');

//Create new Lab
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        return res.status(400).send({
            message: "Este campo no debe estar vacio"
        });
    }

    // Create a Lab
    const lab = new Lab({
        nombre: req.body.nombre || "Sin nombre de laboratorio", 
        descripcion: req.body.descripcion
    });

    // Save Lab in the database
    lab.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al guardar el laboratorio."
        });
    });
};

// Retrieve all labs from the database.
exports.findAll = (req, res) => {
    Lab.find()
    .then(lab => {
        res.send(lab);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al traer el laboratorio."
        });
    });
};

// Find a single lab with a labId
exports.findOne = (req, res) => {
    Lab.findById(req.params.labId)
    .then(lab => {
        if(!lab) {
            return res.status(404).send({
                message: "Laboratorio no encontrado con el id " + req.params.labId
            });            
        }
        res.send(lab);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lab no encontrado con el id " + req.params.labId
            });                
        }
        return res.status(500).send({
            message: "Algo ocurrio con el id " + req.params.labId
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
    Lab.findByIdAndUpdate(req.params.labId, {
        nombre: req.body.nombre || "Sin nombre de laboratorio", 
        descripcion: req.body.descripcion,
        
    }, {new: true})
    .then(lab => {
        if(!lab) {
            return res.status(404).send({
                message: "Laboratorio no encontrado con el id " + req.params.labId
            });
        }
        res.send(lab);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Laboratorio no encontrado con el id " + req.params.labId
            });                
        }
        return res.status(500).send({
            message: "Algo ocurrio actualizando con el id " + req.params.labId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Lab.findByIdAndRemove(req.params.labId)
    .then(lab => {
        if(!lab) {
            return res.status(404).send({
                message: "Lab not found with id " + req.params.labId
            });
        }
        res.send({message: "Lab deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Lab not found with id " + req.params.labId
            });                
        }
        return res.status(500).send({
            message: "Could not delete lab with id " + req.params.labId
        });
    });
};