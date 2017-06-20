var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors=require('cors');
var routes = require('./routes/index');
var clientes=require('./routes/Clientes');
var pedidos=require('./routes/Pedido');
var app = express();
var firebase = require("firebase-admin");
var request = require('request');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/Clientes', clientes);
app.use('/Pedido', pedidos);

var serviceAccount = require("./RestoGo-b5cf9783da9b.json");

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://restogo-9729a.firebaseio.com/"
});

ref = firebase.database().ref();

function listenForNotificationRequests() {
  var requests = ref.child('notificationRequests');
  requests.on('child_added', function(requestSnapshot) {
    var request = requestSnapshot.val();
    sendNotificationToUser(
      request.username, 
      request.message,
      function() {
        requestSnapshot.ref.remove();
      }
    );
  }, function(error) {
    console.error("Error listen: "+error);
  });
};

function sendNotificationToUser(username, message, onSuccess) {
	console.log("Token: "+username);
  request({
    url: 'https://fcm.googleapis.com/fcm/send',
    method: 'POST',
    headers: {
      'Content-Type' :' application/json',
      'Authorization': 'key=AAAAb18ayaQ:APA91bHp_Ekfl3pt8a39TbyyYH5yPrrTxQZ25_0-pMQQyr7lDoCvyknCwabpQ-Jtrr3WVMTdZU5pJgA-F__RRyPdPimtVIZZbiWHY_jQzfkTb_dfoa0VyH7mM4RYFFxhPRHp0vQaRXj5'
    },
    body: JSON.stringify({ 
    	"notification": {
    		"title": "Nuevo pedido!",
    		"text": message
 		 },
  		"to" : username
	})
  }, function(error, response, body) {
    if (error) { console.error("Error send:"+error); }
    else if (response.statusCode >= 400) { 
      console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage); 
    }
    else {
    	console.log("Notification Success!");
      onSuccess();
    }
  });
}

// start listening
listenForNotificationRequests();


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
