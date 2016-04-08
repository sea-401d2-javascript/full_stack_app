'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/dev');
const router = express.Router();

app.use((req, res, next)=>{
  res.header('Access-Control-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

require('./routes/arcade-route')(router);
require('./routes/game-route')(router);

app.use('/api', router);

app.listen(port);
console.log('Magic is happening on port ' + port);
