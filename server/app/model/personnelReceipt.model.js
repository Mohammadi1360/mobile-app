module.exports = (sequelize, Sequelize) => {
    const PersonnelReceipt = sequelize.define('personnelReceipt', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        receiptAmount: {
            type: Sequelize.DECIMAL
        },
        paidAmount: {
            type: Sequelize.DECIMAL
        }
    });

    return PersonnelReceipt;
};
