const env = {
    database: {
        forceDBCreation: false,
        databaseName: 'openlibr_db',
        username: 'openlibr_user',
        password: '1@Open',
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    user: {
        sessionExpiredIn: 86400
    },
    server: {
        port: 3003
    }
};

module.exports = env;
