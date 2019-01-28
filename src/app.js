//configuracion de express
const express = require('express');
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

});

//routes
app.use(require('./routes/empleados'));
app.use(require('./routes/proveedores'));
app.use(require('./routes/productos'));

module.exports = app;