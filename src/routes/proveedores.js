const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.get('/provedores', (req, res) => {
    mysqlconecction.query('select * from provedores', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/provedores/:id', (req, res) => {
    const { id } = req.params;
    mysqlconecction.query('select * from provedores where nit_empresa=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/provedores', (req, res) => {
    const {
        primer_nombre_representante,
        segundo_nombre_representante,
        primer_apellido_representante,
        segundo_apellido_representante,
        nit_empresa,
        nombre_empresa
    } = req.body;

    mysqlconecction.query('insert into provedores (primer_nombre_representante,segundo_nombre_representante,primer_apellido_representante,segundo_apellido_representante,nit_empresa,nombre_empresa) values (?,?,?,?,?,?)',
        [
            primer_nombre_representante,
            segundo_nombre_representante,
            primer_apellido_representante,
            segundo_apellido_representante,
            nit_empresa,
            nombre_empresa
        ], (err, rows, fields) => {
            if (!err) {
                res.json({ Status: 'proveedor guardado' });
            } else {
                console.log(err);
            }
        });
});

module.exports = router;
