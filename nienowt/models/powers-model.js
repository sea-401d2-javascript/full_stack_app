'use strict';

const mongoose = require('mongoose');

const powersSchema = mongoose.Schema({
  primary: {type: String, default: 'Rude whisper'},
  secondary: {type: String, default: 'shrieking'},
  weakness: {type: String, default: 'teen detectives'}
});

module.exports = mongoose.model('powers', powersSchema);
