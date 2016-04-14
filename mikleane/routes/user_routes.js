'use strict';

let express = require('express');
let User = require(__dirname + '/../models/user_model');

let publicRouter = module.exports = exports = express.Router();

publicRouter.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    res.json({users});
  });
});

publicRouter.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    res.json(user);
  });
});

publicRouter.post('/users', (req, res) => {
  // console.log('rec ', req.body)
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    // console.log('err', err)
    // console.log('user ', user)
    res.json(user);
  });
});

publicRouter.put('/users/:id',(req,res) => {
  User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
    if (err) return res.send(err);
    res.json(user);
  });
});

publicRouter.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, user) => {
    if(err) return res.send(err);
      res.send('user deleted');
  });
});
