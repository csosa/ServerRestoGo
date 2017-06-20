var express = require('express');
var router = express.Router();
var Pedido = require('../models/Pedido');

router.post('/', function(req, res, next){
    Pedido.addPedido(req.body, function(err, count){
		if(err) {
            res.json(err);
        }
        else{
            res.json(req.body);//or return count for 1 & 0
        }
    });
});

module.exports = router;