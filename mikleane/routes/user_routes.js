'use strict';

let express = require('express');
let User = require(__dirname + '/../models/user_model');
// let auth = require(__dirname + '/../lib/auth.js');

let publicRouter = module.exports = exports = express.Router();

// publicRouter.post('/signup', auth, function (req, res) {
//   console.log('hit /signup POST route');
//   var newUser = new User();
//   newUser.name = req.body.name;
//   newUser.hashPassword(req.body.password);
//   newUser.save((err, data) => {
//     if (err) {
//       console.log('error');
//     }
//     console.log('user saved');
//     res.status(200).json({token: data.generateToken()});
//   });
// });
// publicRouter.get('/login', auth, (req, res)=> {
//   console.log('hit /login route');
//   User.findOne({name: req.body.name}, (err, user) => {
//     let valid = user.compareHash(req.body.password);
//     if(!valid) {
//       return res.json({status:'failure'});
//     }
//     var myToken = user.generateToken();
//     res.json({token: myToken});
//     console.log('token ' + myToken);
//   });
// });

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
  console.log('rec ', req.body)
  var newUser = new User(req.body);
  newUser.save((err, user) => {
    console.log('err', err)
    console.log('user ', user)
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
