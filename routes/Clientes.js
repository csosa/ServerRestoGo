var express = require('express');
var router = express();
var Cliente = require('../models/Cliente');

router.get('/:ussid?',function(req,res,next){

    if(req.params.ussid){
        Cliente.getClienteById(req.params.ussid,function(err,rows){
            if(err){
                console.log("Consulta por el cliente error:");
                console.log("-------------------------------------------------------------------------");
                res.json(err);
            }
            else{
                console.log("Consulta por el cliente ok");
                console.log("-------------------------------------------------------------------------");
                res.json(rows);
            }
        });
    }
    else{
        Cliente.getAllClientes(function(err,rows){

            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
 
        });
    }  
});
router.post('/',function(req,res,next){
    Cliente.addCliente(req.body,function(err,count){
		if(err) {
            res.json(err);
            console.log("Error insertando Cliente.");
            console.log("-------------------------------------------------------------------------");
        }
        else{
            res.json(req.body);
            console.log("Cliente insertado correctamente!");
            console.log("-------------------------------------------------------------------------");
        }
    });
});

module.exports=router;