'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Beers = require(__dirname + '/../models/beer_model');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

let beerRouter = module.exports = exports = express.Router();


beerRouter.get('/beers',(req, res) => {
  Beers.find({}, (err, beers)=> {
    if (err) return handleDBError(err, res);
    res.status(200).json({beers});
  });
});

beerRouter.get('/beers/:id', jwtAuth, (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    res.json(beer);
  });
});

beerRouter.post('/beers', jsonParser, jwtAuth,(req, res) => {
  var newBeer = new Beers(req.body);
  newBeer.save((err, beer) => {
    if(err) return handleDBError(err, res);
    res.status(200).json(beer);
  });
});

beerRouter.put('/beers/:id',jsonParser, jwtAuth, (req,res) => {
  Beers.findByIdAndUpdate(req.params.id, req.body, (err, beer) => {
    if (err) return res.send(err);
    res.json(beer);
  });
});

beerRouter.delete('/beers/:id', jwtAuth, (req, res) => {
  Beers.findByIdAndRemove(req.params.id, (err, beer) => {
    if(err) return res.send(err);
      res.send('deleted');
  });
});
