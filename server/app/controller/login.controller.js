const uuidv4 = require('uuid/v4');
const Login = require('../model/login.model');

let loginList = [];

findById = (loginId) => {
    return new Promise((resolve, reject) => {
        const login = loginList.filter(login => login.loginId === loginId);
        if (login.length > 0) {
            resolve(login[0]);
        } else {
            reject('Login Id Not Found !');
        }
    });
};

insertLogin = (user) => {
    return new Promise((resolve) => {
        let login = new Login(uuidv4(), user.userId, user.userAgent);
        loginList.push(login);
        resolve(login);
    });
};

deleteLogin = (loginId) => {
    return new Promise((resolve) => {
        loginList = loginList.filter(login => login.loginId !== loginId);
        resolve(true);
    });
};

deleteAllLogin = () => {
    return new Promise((resolve) => {
        loginList = [];
        resolve(true);
    });
};

const loginController = {};
loginController.findById = findById;
loginController.insertLogin = insertLogin;
loginController.deleteLogin = deleteLogin;

module.exports = loginController;
