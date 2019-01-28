const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.get('/empleados', (req, res) => {
    mysqlconecction.query('select * from empleado', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/empleado/:id', (req, res) => {
    const { id } = req.params;
    mysqlconecction.query('select * from empleado where cedula_empleado=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/newempleado', (req, res) => {
    const {cedula_empleado,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,cargo,salario} = req.body;
    mysqlconecction.query('insert into empleado (cedula_empleado,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,cargo,salario) values (?,?,?,?,?,?,?)', 
    [cedula_empleado,primer_nombre,segundo_nombre,primer_apellido,segundo_apellido,cargo,salario], (err, rows, fields) => {
        if (!err) {
            res.json({ Status: 'Empleado guardado' });
        } else {
            console.log(err);
        }
    });
});

/*
router.put('/actualizarempleado', (req, res) => {

    const { id, name, salario } = req.body;

    mysqlconecction.query('select id from empleados where id=?', [id], (err, rows, fields) => {

        if (rows[0] != null) {

            mysqlconecction.query('update empelados set name=?, salario=? where id=?', [name, salario, id], (err, rows, fields) => {
                if (!err) {
                    res.json({ Status: 'Empleado actualizado' });
                } else {
                    console.log(err);
                }
            });

        } else {
            res.json({ Status: 'El empleado no existe' });
        }

    });

});

router.post('/login', (req, res) => {


    const { correo, contraseña } = req.body;

    if (correo != "") {

        if (contraseña != "") {

            mysqlconecction.query('select correo from usuarios where correo=?', [correo], (err, rows, fields) => {

                if (rows[0] != null) {
                    mysqlconecction.query('select contraseña from usuarios where contraseña=? and correo=?', [contraseña, correo], (err, rows, fields) => {
                        if (rows[0] != null) {
                            res.json({ Status: 'Login exitoso' });
                            return;
                        } else {
                            res.json({ Status: 'Contraseña erronea' });
                        }
                    });

                } else {
                    res.json({ Status: 'Correo erroneo' });
                }

            });

        } else {
            res.json({ Status: 'Ingrese contraseña' });
        }

    } else {

        res.json({ Status: 'Ingrese usuario' });

    }
});
*/
module.exports = router;