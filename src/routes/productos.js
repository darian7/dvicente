const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.get('/productos', (req, res) => {
    mysqlconecction.query('select * from productos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    mysqlconecction.query('select * from productos where id_producto=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/productos', (req, res) => {
    const {
        nombre_producto,
        precio_kilo,
        cantidad,
        estado_producto
    } = req.body;

    mysqlconecction.query('insert into productos (nombre_producto,precio_kilo,cantidad,estado_producto) values (?,?,?,?)',
        [
            nombre_producto,
            precio_kilo,
            cantidad,
            estado_producto
        ], (err, rows, fields) => {
            if (!err) {
                res.json({ Status: 'producto guardado' });
            } else {
                console.log(err);
            }
        });
});


module.exports = router;
