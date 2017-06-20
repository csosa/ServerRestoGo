var express = require('express');
var router = express();
var Cliente = require('../models/Cliente');

router.get('/:email?',function(req,res,next){

    if(req.params.email){
        Cliente.getClienteById(req.params.token,function(err,rows){
            if(err){
                res.json(err);
            }
            else{
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
                rowses.json(rows);
            }
 
        });
    }  
});
router.post('/',function(req,res,next){
    Cliente.addCliente(req.body,function(err,count){
		if(err) {
            res.json(err);
            console.log("Error insertando Cliente.")
        }
        else{
            res.json(req.body);
            console.log("Cliente insertado correctamente!")
        }
    });
});

router.post('/:email',function(req,res,next){
  Cliente.deleteAll(req.body,function(err,count){
    if(err){
      res.json(err);
    }
    else{
      res.json(count);
    }
  });
});

router.delete('/:email',function(req,res,next){
    Cliente.deleteCliente(req.params.email,function(err,count){
        if(err){
            res.json(err);
        }
        else{
            res.json(count);
        }

    });
});

router.put('/:email',function(req,res,next){

    Cliente.updateCliente(req.params.email,req.body,function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

module.exports=router;