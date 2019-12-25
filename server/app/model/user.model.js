module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        mobileNo: {
            type: Sequelize.STRING
        },
        verifiedMobileNo: {
            type: Sequelize.BOOLEAN
        },
        email: {
            type: Sequelize.STRING
        },
        verifiedEmail: {
            type: Sequelize.BOOLEAN
        },
        enable: {
            type: Sequelize.BOOLEAN
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};