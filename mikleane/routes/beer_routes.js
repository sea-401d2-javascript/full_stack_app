'use strict';

let express = require('express');
// let tokenAuth = require(__dirname + '/../lib/tokenauth');
let Beers = require(__dirname + '/../models/beer_model');

let beerRouter = module.exports = exports = express.Router();


beerRouter.get('/beers',(req, res) => {
  Beers.find({}, (err, beers)=> {
    res.json({beers});
  });
});

beerRouter.get('/beers/:id', (req, res) => {
  Beers.findById(req.params.id, (err, beer) => {
    res.json(beer);
  });
});

beerRouter.post('/beers', (req, res) => {
  var newBeer = new Beers(req.body);
  newBeer.save((err, beer) => {
    res.json(beer);
  });
});

beerRouter.put('/beers/:id',(req,res) => {
  Beers.findByIdAndUpdate(req.params.id, req.body, (err, beer) => {
    if (err) return res.send(err);
    res.json(beer);
  });
});

beerRouter.delete('/beers/:id', (req, res) => {
  Beers.findByIdAndRemove(req.params.id, (err, beer) => {
    if(err) return res.send(err);
      res.send('deleted');
  });
});
