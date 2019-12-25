const env = require('../config/env.js');
const db = require('../config/db.config.js');
const config = require('../config/config.js');
const loginController = require('../controller/login.controller');

const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
    console.log("signup !!!");

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobileNo: req.body.mobileNo,
        verifiedMobileNo: false,
        email: req.body.email,
        verifiedEmail: false,
        enable: false,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.or]: ['user']
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                res.send({message: "MOBILE_NO_REGISTERED_SUCCESSFULLY"});
            });
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
};


exports.signin = (req, res) => {
    console.log("signin !!!");
    const userAgent = req.headers['user-agent'];
    User.findOne({
        where: {
            mobileNo: req.body.mobileNo
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({auth: false, accessToken: null, message: "MOBILE_NO_NOT_FOUND"});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({auth: false, accessToken: null, message: "INVALID_PASSWORD"});
        }

        loginController.insertLogin({
            userId: user.id,
            userAgent: userAgent
        }).then(login => {
            const userData = {
                id: login.loginId,
                // id: user.id,
                // password: user.password
            };

            const token = jwt.sign(userData, config.secret, {
                expiresIn: env.user.sessionExpiredIn
            });

            res.status(200).send({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                mobileNo: user.mobileNo,
                email: user.email,
                auth: true,
                accessToken: token,
                expiresIn: env.user.sessionExpiredIn
            });

        }).catch(err => {
            console.log("Fail! Error -> " + err);
        });

    }).catch(err => {
        res.status(500).send('Error ->> ' + err);
    });
};

exports.signout = (req, res) => {
    console.log("signout !!!");

    loginController.deleteLogin(req.loginId).then(() => {
        res.status(200).send({
            auth: false,
            accessToken: null,
            message: "USER_LOGOUT_SUCCESSFULLY"
        });
    }).catch(err => {
        console.log("Fail! Error -> " + err);
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        },
        {where: {id: id}}
    ).then(rowsUpdated => {
        if (rowsUpdated[0] !== 0) {
            res.status(200).send({message: "USER_UPDATED_SUCCESSFULLY", id: id});
        } else {
            res.status(500).send({message: "USER_NOT_EXISTS", id: id});
        }

    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

exports.changePassword = (req, res) => {
    console.log("change pass");

    const id = req.userId;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({auth: false, accessToken: null, message: "USER_ID_NOT_FOUND"});
        }

        var passwordIsValid = bcrypt.compareSync(oldPassword, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({auth: false, accessToken: null, message: "INVALID_OLD_PASSWORD"});
        }

        User.update({
                password: bcrypt.hashSync(newPassword, 8)
            },
            {where: {id: id}}
        ).then(() => {

            loginController.deleteLogin(req.loginId).then(() => {
                res.status(200).send({auth: false, accessToken: null, message: "PASSWORD_CHANGED_SUCCESSFULLY"});
            });
        });

    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
};


exports.userContent = (req, res) => {
    console.log("userContent !!!");
    User.findOne({
        where: {id: req.userId},
        attributes: ['firstName', 'lastName', 'mobileNo'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "User Content Page",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
};

exports.adminBoard = (req, res) => {
    console.log("adminBoard !!!");
    User.findOne({
        where: {id: req.userId},
        attributes: ['firstName', 'lastName', 'mobileNo'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Admin Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Admin Board",
            "error": err
        });
    })
};

exports.managerBoard = (req, res) => {
    console.log("managerBoard !!!");
    User.findOne({
        where: {id: req.userId},
        attributes: ['firstName', 'lastName', 'mobileNo'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Manager Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Manager Board",
            "error": err
        });
    })
};
