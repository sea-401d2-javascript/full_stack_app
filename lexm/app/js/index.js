const angular = require('angular');
const moment = require('moment');
const angularMoment = require('angular-moment');

const app = angular.module('MovieApp', ['angularMoment']);

require('./movieController')(app);
require('./directorController')(app);
