'use strict';

const mongoose = require('mongoose');

const friendSchema = mongoose.Schema({
  name: String,
  numTeeth: {type: Number, default: 27},
  isCool: {type: Boolean, default: false}
});

module.exports = mongoose.model('friends', friendSchema);
