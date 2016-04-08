'use strict';
var express = require('express');
var app = express();
var Gem = require('./models/gem_model');
var Continent = require('./models/continent_model');
var bodyParser = require('body-parser');
let router = express.Router();
let mongoose = require('mongoose');


let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());
app.use(router);

require('./routes/contRouter')(router,Continent,User);
require('./routes/gemRouter')(router,Gem ,User);
require('./routes/register')(router, User);
require('./routes/login')(router, User);


app.listen(3000, ()=>{
  console.log('Port 3000 is listening..');

});
