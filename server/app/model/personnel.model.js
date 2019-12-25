module.exports = (sequelize, Sequelize) => {
    const Personnel = sequelize.define('personnel', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        personCode: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        firstName: {
            type: Sequelize.STRING(160),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(160),
            allowNull: false
        },
        fatherName: {
            type: Sequelize.STRING(160),
            allowNull: false
        },
        certificateNo: {
            type: Sequelize.STRING(40)
        },
        melliCode: {
            type: Sequelize.STRING(40),
            allowNull: false
        },
        sex: {
            type: Sequelize.BOOLEAN
        },
        address: {
            type: Sequelize.STRING(600)
        },
        tel: {
            type: Sequelize.STRING(30)
        },
        mobile: {
            type: Sequelize.STRING(30)
        },
        deptAmount: {
            type: Sequelize.DECIMAL
        },
        trashService: {
            type: Sequelize.BOOLEAN
        },
        neighborId: {
            type: Sequelize.INTEGER
        },
        ownerType: {
            type: Sequelize.STRING(30)
        },
        job: {
            type: Sequelize.STRING(50)
        },
        buildingDocumentNo: {
            type: Sequelize.STRING(30)
        }
    });

    return Personnel;
};
