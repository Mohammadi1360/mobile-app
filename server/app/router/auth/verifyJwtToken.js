const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const db = require('../../config/db.config.js');
const loginController = require('../../controller/login.controller');

const Role = db.role;
const User = db.user;
// const Login = db.login;

verifyToken = (req, res, next) => {
    console.log("verifyToken !!!");
    let token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            auth: false, message: 'NO_TOKEN_PROVIDED'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'FAIL_TO_AUTHENTICATION_ERROR',
                errorBody: err
            });
        }

        loginController.findById(decoded.id).then(login => {
            console.log('loginController.findById ');
            console.log(login);

            if (!login) {
                return res.status(404).send({auth: false, accessToken: null, message: "INVALID_TOKEN_ID"});
            } else {
                req.userId = login.userId;
                req.loginId = decoded.id;
                next();
            }
        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        });

    });

};

isAdmin = (req, res, next) => {
    console.log("isAdmin !!!");
    let token = req.headers['x-access-token'];

    User.findByPk(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    console.log(roles[i].name);
                    if (roles[i].name.toUpperCase() === "ADMIN") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "REQUIRE_ADMIN_ROLE"});
            })
        })
};

isManager = (req, res, next) => {
    console.log("isAManager !!!");
    let token = req.headers['x-access-token'];

    User.findByPk(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    console.log(roles[i].name);
                    if (roles[i].name.toUpperCase() === "MANAGER") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "REQUIRE_MANAGER_ROLE"});
            })
        })
};

isManagerOrAdmin = (req, res, next) => {
    console.log("isManagerOrAdmin !!!");
    let token = req.headers['x-access-token'];

    User.findByPk(req.userId)
        .then(user => {
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name.toUpperCase() === "MANAGER") {
                        next();
                        return;
                    }

                    if (roles[i].name.toUpperCase() === "ADMIN") {
                        next();
                        return;
                    }
                }

                res.status(403).send({message: "REQUIRE_MANAGER_OR_ADMIN_ROLE"});
            })
        })
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isManager = isManager;
authJwt.isManagerOrAdmin = isManagerOrAdmin;

module.exports = authJwt;
