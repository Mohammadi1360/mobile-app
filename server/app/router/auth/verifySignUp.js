const db = require('../../config/db.config.js');
const config = require('../../config/config.js');
const ROLEs = config.ROLEs;
const User = db.user;
const Role = db.role;

checkDuplicateEmailOrMobileNumber = (req, res, next) => {
    console.log("checkDuplicateEmailOrMobileNumber !!!");
    // -> Check Username is already in use
    User.findOne({
        where: {
            mobileNo: req.body.mobileNo
        }
    }).then(user => {
        if (user) {
            res.status(400).send({message: "MOBILE_NO_EXISTS"});
            return;
        }

        // -> Check Email is already in use
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user) {
                res.status(400).send({message: "EMAIL_EXISTS"});
                return;
            }

            next();
        });
    });
}

// checkRolesExisted = (req, res, next) => {
//     console.log("request body");
//     console.log(req.body);
//
//     for (let i = 0; i < req.body.roles.length; i++) {
//         if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
//             res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
//             return;
//         }
//     }
//     next();
// }

const signUpVerify = {};
signUpVerify.checkDuplicateEmailOrMobileNumber = checkDuplicateEmailOrMobileNumber;
// signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;