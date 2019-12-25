const verifySignUp = require('./auth/verifySignUp');

module.exports = function (app) {
    const controller = require('../controller/personnel.controller');

    app.get('/api/public/personnel/:id', controller.findById);
    app.get('/api/public/personnel', controller.list);
    app.post('/api/public/personnel', controller.insert);
    app.put('/api/public/personnel/:id', controller.update);
    app.delete('/api/public/personnel/:id', controller.delete);

};

