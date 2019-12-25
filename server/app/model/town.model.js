module.exports = (sequelize, Sequelize) => {
    const Town = sequelize.define('town', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        shire: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        city: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        czone: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        dehestan: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        townName: {
            type: Sequelize.STRING(200)
        }
    });

    return Town;
};
