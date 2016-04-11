'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:db');

let router = express.Router();
let publicRouter = express.Router();

app.use(bodyParser.json());
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin','http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
})

require('./routes/human-route')(router);
require('./routes/ghost-route')(router);
require('./routes/login-route')(publicRouter);


app.use('/api', router);
app.use('/pub', publicRouter);


app.listen(3000, () => {
  console.log('live 3000');
});
