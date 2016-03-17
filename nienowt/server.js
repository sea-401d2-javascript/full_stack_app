'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:db');

let router = express.Router();
require('./routes/human-route')(router);
require('./routes/ghost-route')(router);


app.use(bodyParser.json());

app.use('/meetghosts', router);
app.listen(3000, () => {
  console.log('live 3000');
});
