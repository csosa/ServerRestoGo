var db = require('../dbconnection');

var Pedido = {

getAllPedidos:function(callback){
	return db.query("select * from pedido",callback);
},

getPedidoById:function(id,callback){
	 console.log(id);
	return db.query("select * from pedido where token=?",[id],callback);
},

addCliente:function(Pedido,callback){
   console.log("[RestoGo] Por crear un nuevo Pedido");
   console.log(Pedido.idPedido);
	return db.query("INSERT into pedido values(?,?)",[Pedido.TokenRestaurante, Pedido.Cliente_email], callback);
},

deleteCliente:function(id,callback){
    return db.query("delete from pedido where idPedido=?",[id],callback);
},

};
module.exports=Pedido;