'use strict';
const angular = require('angular');
const serverPath = require('../config.js').serverPath;
require('style!css!./styles/mystyle.css');

angular.module('TreeApp', [])
  .controller('SpeciessController', ['$http', function($http) {
    this.plz = 'plz respond';

    this.resource = 'speciess';
    this.path = `${serverPath}/${this.resource}`;
    this.speciess = [];

    this.read = function() {
      $http.get(this.path)
        .then(res => this.speciess = res.data)
        .catch(err => console.log(err));
    };

    this.reset = function(species) {
      console.log('reset species');
      $http.get(this.path +'/'+ species._id)
        .then(res => this.speciess[this.speciess.indexOf(species)] = res.data)
        .catch(err => console.log(err));
    };

    this.create = function(species) {
      $http.post(this.path, species)
        .then(res => this.speciess.push(res.data))
        .catch(err => console.log(err));
    };

    this.delete = function(species) {
      $http.delete(this.path+'/'+species._id)
        .then(res => this.speciess.splice(this.speciess.indexOf(species), 1))
        .catch(err => console.log(err));
    };

    this.update = function(species) {
      $http.put(this.path + '/' + species._id, species)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    };
    this.update.displayed = null;

  }])
  .controller('TreesController', ['$http', function($http) {
    this.plz = 'plz respond';

    this.resource = 'trees'
    this.path = `${serverPath}/${this.resource}`;
    this.trees = [];

    this.read = function() {
      $http.get(this.path)
        .then(res => this.trees = res.data)
        .catch(err => console.log(err));
    };

    this.reset = function(tree) {
      $http.get(this.path +'/'+ tree._id)
        .then(res => this.trees[this.trees.indexOf(tree)] = res.data)
        .catch(err => console.log(err));
    };

    this.create = function(tree) {
      $http.post(this.path, tree)
        .then(res => this.trees.push(res.data))
        .catch(err => console.log(err));
    };

    this.delete = function(tree) {
      $http.delete(this.path+'/'+tree._id)
        .then(res => this.trees.splice(this.trees.indexOf(tree), 1))
        .catch(err => console.log(err));
    };

    this.update = function(tree) {
      $http.put(this.path + '/' + tree._id, tree)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    };
    this.update.displayed = null;



  }])
