const verifySignUp = require('./auth/verifySignUp');

module.exports = function (app) {
    const controller = require('../controller/town.controller');

    app.post('/api/private/town/townList', controller.listAllDistinct);
    app.get('/api/private/town/:id', controller.findTownById);

};

