var db = require('../dbconnection');

var Cliente = {

getAllClientes:function(callback){
	return db.query("select * from cliente", callback);
},

getClienteById:function(id, callback){
	 console.log("Consulta por el cliente:"+id);
	return db.query("select token from cliente where email=?",[id],callback);
},

addCliente:function(Cliente, callback){
   console.log("[RestoGo] Por insertar un nuevo cliente");
   console.log("Email: "+Cliente.email);
	return db.query("INSERT into cliente values(?,?)", [Cliente.email, Cliente.token], callback);
},

deleteCliente:function(id, callback){
    return db.query("delete from cliente where email=?",[id],callback);
},

updateCliente:function(email, Cliente, callback){
    return  db.query("update cliente set token=? where email=?",[Cliente.token, email], callback);
},

deleteAll:function(item,callback){

var delarr=[];
   for(i=0;i<item.length;i++){
       delarr[i]=item[i].Id;
   }
   return db.query("delete from cliente where email in (?)",[delarr],callback);
}
};
module.exports = Cliente;