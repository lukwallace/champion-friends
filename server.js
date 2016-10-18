var express = require('express');
var askRito = require('./queryRito.js');
var settings = require('./config.js');

var app = express();


var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(allowCrossDomain);
app.get('/masteries', function(req, res) {
  askRito.getData().then(function(data) {
    res.send(data);
  });
});

console.log('Server listening on', settings.PORT);
app.listen(settings.PORT);
