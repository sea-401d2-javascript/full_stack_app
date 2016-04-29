'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  favBeers: [String],
  authentication: {
    email: String,
    password: String
  }

});

userSchema.methods.hashPassword = function(password) {
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.authentication.password);
};

userSchema.methods.generateToken = function() {
  return jwt.sign({id: this._id}, process.env.APP_SECRET || 'change this');
};


module.exports = exports = mongoose.model('User', userSchema);
