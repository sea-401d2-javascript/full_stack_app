'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:db');

let apiRouter = express.Router();
require('./routes/friend-route')(apiRouter);
require('./routes/ghost-route')(apiRouter);

app.use(bodyParser.json());

app.use('/', apiRouter);
app.listen(3000, () => {
  console.log('live 3000');
});
