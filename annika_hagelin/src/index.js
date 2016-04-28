'use strict';
const angular = require('angular');
const serverPath = require('../config.js').serverPath;
require('style!css!./styles/mystyle.css');

const app = angular.module('TreeApp', []);

require('./services/index.js')(app);
require('./directives/index.js')(app);

  app.controller('SpeciessController', ['ResourceService', function(ResourceService) {
    this.plz = 'plz respond';

    var speciess = [];
    var vm = new ResourceService('speciess', speciess);
    vm.speciess = speciess;
    return vm;

  }])
  .controller('TreesController', ['ResourceService', function(ResourceService) {

    var trees = [];
    var vm = new ResourceService('trees', trees);
    vm.trees = trees;
    return vm;

  }])
  .controller('UserController', ['AuthService', '$location', function(AuthService, $location) {
    var vm = this;

    vm.signUp = function(user) {
      AuthService.createUser(user);
    }

    return vm;

  }])
