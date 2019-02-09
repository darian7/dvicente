const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.post('/login', (req, res) => {


    const { usuario, contraseña, tipo_usuario } = req.body;

    if (usuario != "") {

        if (contraseña != "") {

            mysqlconecction.query('select usuario from usuarios where usuario=?', [usuario], (err, rows, fields) => {

                if (rows[0] != null) {
                    mysqlconecction.query('select contraseña from usuarios where contraseña=? and usuario=? and tipo_usuario=?' , [contraseña, usuario, tipo_usuario], (err, rows, fields) => {
                        if (rows[0] != null) {
                            res.json({ Status: 'Login exitoso' });
                            return;
                        } else {
                            res.json({ Status: 'Contraseña erronea' });
                        }
                    });

                } else {
                    res.json({ Status: 'usuario erroneo' });
                }

            });

        } else {
            res.json({ Status: 'Ingrese contraseña' });
        }

    } else {

        res.json({ Status: 'Ingrese usuario' });

    }
});

module.exports = router;