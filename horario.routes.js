module.exports = (app) => {
    const horarios = require('./lab.controller.js');

    // Create a new Lab
    app.post('/horarios', horarios.create);

    // Retrieve all Labs
    app.get('/horarios', horarios.findAll);

    // Retrieve a single Lab with LabId
    app.get('/horarios/:horarioId', horarios.findOne);

    // Update a Note with LabId
    app.put('/horarios/:horarioId', horarios.update);

    // Delete a Note with LabId
    app.delete('/horarios/:horarioId', horarios.delete);
}