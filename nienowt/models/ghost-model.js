'use strict';

const mongoose = require('mongoose');

const ghostSchema = mongoose.Schema({
  name: String,
  isEvil: {type: Boolean, default:true}
});

module.exports = mongoose.model('ghosts', ghostSchema);
