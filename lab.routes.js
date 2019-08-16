module.exports = (app) => {
    const labs = require('./lab.controller.js');

    // Create a new Lab
    app.post('/labs', labs.create);

    // Retrieve all Labs
    app.get('/labs', labs.findAll);

    // Retrieve a single Lab with LabId
    app.get('/labs/:labId', labs.findOne);

    // Update a Note with LabId
    app.put('/labs/:labId', labs.update);

    // Delete a Note with LabId
    app.delete('/labs/:labId', labs.delete);
}