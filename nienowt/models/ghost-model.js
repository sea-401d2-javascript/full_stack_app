'use strict';

const mongoose = require('mongoose');

const ghostSchema = mongoose.Schema({
  name: String,
  isEvil: {type: Boolean, default:true},
  numEyes: {type: Number, default: 3},
  powers: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Powers'
    }
  ]
});

module.exports = mongoose.model('ghosts', ghostSchema);
