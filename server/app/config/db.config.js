const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database.databaseName, env.database.username, env.database.password, {
    charset: 'utf8',
    collate: 'utf8_persian_ci',
    host: env.database.host,
    dialect: env.database.dialect,
    operatorsAliases: false,

    pool: {
        max: env.database.max,
        min: env.database.pool.min,
        acquire: env.database.pool.acquire,
        idle: env.database.pool.idle
    },
    define: {
        timestamps: false
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/user.model')(sequelize, Sequelize);
db.role = require('../model/role.model')(sequelize, Sequelize);
// db.login = require('../model/login.model')(sequelize, Sequelize);
db.town = require('../model/town.model')(sequelize, Sequelize);
db.personnel = require('../model/personnel.model')(sequelize, Sequelize);
db.receipt = require('../model/receipt.model')(sequelize, Sequelize);
db.personnelReceipt = require('../model/personnelReceipt.model')(sequelize, Sequelize);


db.role.belongsToMany(db.user, {through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, {through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});

// db.user.hasMany(db.login, {as: 'Owner', foreignKey: 'userId'});
db.user.hasMany(db.town);
// db.login.belongsTo(db.user, {foreignKey: 'userId'});

db.town.hasMany(db.personnel, {foreignKey: 'townId'});
db.personnel.belongsTo(db.town, {foreignKey: 'townId'});

db.receipt.hasMany(db.personnelReceipt);
db.personnelReceipt.belongsTo(db.personnel, {as: 'Owner', foreignKey: 'personnelId'});
db.personnelReceipt.belongsTo(db.town, {foreignKey: 'townId'});

module.exports = db;
