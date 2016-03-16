'use strict';

const mongoose = require('mongoose');

const ghostSchema = mongoose.Schema({
  name: String,
  isEvil: {type: Boolean, default:true},
  numEyes: {type: Number, default: 3}
});

module.exports = mongoose.model('ghosts', ghostSchema);
