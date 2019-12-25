module.exports = (sequelize, Sequelize) => {
    const Receipt = sequelize.define('receipt', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        receiptYear: {
            type: Sequelize.INTEGER
        },
        period: {
            type: Sequelize.STRING(200),
        },
        fromDate: {
            type: Sequelize.DATE
        },
        toDate: {
            type: Sequelize.DATE
        },
        registerDate: {
            type: Sequelize.DATE
        },
        deadLineDate: {
            type: Sequelize.DATE
        },
        motto: {
            type: Sequelize.STRING
        },
        message: {
            type: Sequelize.STRING
        },
        accountNo: {
            type: Sequelize.STRING(120)
        },
        printed: {
            type: Sequelize.BOOLEAN
        },
        transferred: {
            type: Sequelize.BOOLEAN
        },
        trashPeriod: {
            type: Sequelize.INTEGER
        }
    });

    return Receipt;
};
