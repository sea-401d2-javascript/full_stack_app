'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const User = require(__dirname + '/../models/user_model');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');


let publicRouter = module.exports = exports = express.Router();

publicRouter.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json({users});
  });
});

publicRouter.get('/users/:id', jwtAuth, (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.json(user);
  });
});

publicRouter.post('/users', jsonParser, jwtAuth, (req, res) => {
  // console.log('rec ', req.body)
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    // console.log('err', err)
    // console.log('user ', user)
    res.json(user);
  });
});

publicRouter.put('/users/:id',jsonParser, jwtAuth, (req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return res.send(err);
    res.json(user);
  });
});

publicRouter.delete('/users/:id', jwtAuth, (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if(err) return res.send(err);
      res.send('user deleted');
  });
});
