'use strict';
var mongoose = require('mongoose');
var DB_PORT = process.env.MONGOLAB_URI || 'mongodb://localhost/db';
mongoose.connect(DB_PORT);
const models = {};

require('./Arcade')(mongoose, models);
require('./Game')(mongoose, models);

module.exports = models;
