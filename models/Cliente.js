var db = require('../dbconnection');

var Cliente = {

getAllClientes:function(callback){
	return db.query("select * from cliente", callback);
},

getClienteById:function(id, callback){
  console.log("-------------------------------------------------------------------------");
	 console.log("Consulta por el cliente con ussid:"+id);
	return db.query("select token from cliente where ussid=?",[id],callback);
},

addCliente:function(Cliente, callback){
  console.log("-------------------------------------------------------------------------");
   console.log("[RestoGo] Por insertar un nuevo cliente");
   console.log("Ussid: "+Cliente.ussid);
	return db.query("INSERT into cliente values(?,?)", [Cliente.ussid, Cliente.token], callback);
}
};
module.exports = Cliente;