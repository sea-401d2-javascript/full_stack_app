'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let config = require('./config/env');

let mongoose = require('mongoose');
let customers = require(__dirname + '/models/customers-model');
let products = require('./models/products-model');

let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());
let middleRouter = express.Router();
require(__dirname + '/routes/route-handle')(middleRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/', middleRouter);
//allows cors
app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
