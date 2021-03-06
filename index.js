var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors=require('cors');
var routes = require('./routes/index');
var clientes = require('./routes/Clientes');
var Tasks=require('./routes/Tasks');
var app = express();
var http = require('http');


// view engine setup
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/Clientes', clientes);
app.use('/Tasks',Tasks);

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

var server = app.listen(8080, function() {
    console.log('Ready on port %d', server.address().port);
});

module.exports = app;
