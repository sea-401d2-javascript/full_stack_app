'use strict';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ideas');
let db = {};

require('./ideas')(mongoose, db);
require('./students')(mongoose, db);

module.exports = db;
