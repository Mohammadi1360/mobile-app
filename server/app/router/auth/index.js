const verifySignUp = require('./verifySignUp');

module.exports = function (app) {

    const controller = require('../../controller/user.controller.js');
    // const personnelController = require('../controller/personnel.controller');

    // app.post('/api/auth/signup', [verifySignUp.checkDuplicateEmailOrMobileNumber, verifySignUp.checkRolesExisted], controller.signup);
    app.post('/api/public/user/signup', [verifySignUp.checkDuplicateEmailOrMobileNumber], controller.signup);
    app.post('/api/public/user/signin', controller.signin);

    app.put('/api/private/user/changePassword', controller.changePassword);
    app.put('/api/private/user/signout', controller.signout);
    app.put('/api/private/user/:id', controller.update);
    app.get('/api/private/user/user', controller.userContent);
    app.get('/api/private/admin/admin', controller.adminBoard);
    app.get('/api/private/manager/manager', controller.managerBoard);
};
