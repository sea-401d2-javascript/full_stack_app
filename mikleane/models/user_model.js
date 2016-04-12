'use strict';

let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  favBeers: [String]
});

module.exports = exports = mongoose.model('User', userSchema);
