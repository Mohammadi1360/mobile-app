const env = require('./app/config/env.js');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const authJwt = require('./app/router/auth/verifyJwtToken');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type,Accept");
    next();
});


app.use(bodyParser.json());

app.all('/api/private/*', [authJwt.verifyToken]);
app.all('/api/private/admin/*', [authJwt.isAdmin]);
app.all('/api/private/manager/*', [authJwt.isManagerOrAdmin]);

require('./app/router/auth/index.js')(app);
require('./app/router/personnel.js')(app);
require('./app/router/town')(app);

const db = require('./app/config/db.config.js');

const Role = db.role;

// force: true will drop the table if it already exists
db.sequelize.sync({force: env.database.forceDBCreation}).then(() => {
    if (env.database.forceDBCreation) {
        console.log('Drop and Resync with { force: true }');
        initial();
    } else {
        console.log('{force: false }');
    }
});

//require('./app/route/project.route.js')(app);
// Create a Server

var server = app.listen(env.server.port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port)
});


function initial() {
    Role.create({
        id: 1,
        name: "USER"
    });

    Role.create({
        id: 2,
        name: "ADMIN"
    });

    Role.create({
        id: 3,
        name: "MANAGER"
    });
}
