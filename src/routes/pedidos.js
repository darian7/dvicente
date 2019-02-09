const express = require('express');
const router = express.Router();
const mysqlconecction = require('../database');

router.get('/pedidos', (req, res) => {
    mysqlconecction.query('select * from pedidos', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

router.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    mysqlconecction.query('select * from pedidos where id_pedido=?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

router.post('/pedidos', (req, res) => {
    const {
        fk_comanda_comandante,
        fk_comanda_id,
        fk_comanda_batallon,
        dia,
        mes,
        año,
        total_pedido,
        estado_pedido
    } = req.body;

    mysqlconecction.query('insert into productos (fk_comanda_comandante,fk_comanda_id,fk_comanda_batallon,dia,mes,año,total_pedido,estado_pedido) values (?,?,?,?,?,?,?,?)',
        [
            fk_comanda_comandante,
            fk_comanda_id,
            fk_comanda_batallon,
            dia,
            mes,
            año,
            total_pedido,
            estado_pedido
        ], (err, rows, fields) => {
            if (!err) {
                res.json({ Status: 'pedido guardado' });
            } else {
                console.log(err);
            }
        });
});


module.exports = router;
