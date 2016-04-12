'use strict';
let express = require('express');
let bodyParser = require('body-parser');
let app = module.exports = express();
let mongoose = require('mongoose');


let DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);

app.use(bodyParser.json());

let beerRouter = require(__dirname + '/routes/beer_routes');
let publicRouter = require(__dirname + '/routes/user_routes');

app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
 res.header('Access-Control-Allow-Headers', 'Content-Type');
 res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
 next();
});


app.use('/', beerRouter);
app.use('/', publicRouter);

app.listen(3000, () => {
  console.log('server started');
});
