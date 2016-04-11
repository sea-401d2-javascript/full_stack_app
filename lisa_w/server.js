'use strict';
var express = require('express');
// var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var models = require(__dirname + '/models');
var Game = models.Game;
var Arcade = models.Arcade;
var app = express();

// const port = process.env.PORT || 5000;

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:5000/dev')
var router = express.Router();
// var arcadeRouter = express.Router();

app.use(bodyParser.json());

require(__dirname + '/routes/arcade-route')(router, models);
require(__dirname + '/routes/game-route')(router, models);

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// app.use(morgan('dev'));
app.use('/', router);


app.listen(5000, ()=>{
  console.log('Magic is happening on port 5000');

});
