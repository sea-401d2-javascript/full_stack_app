'use strict';
let angular = require('angular');

// require('../build/.css')

let app = angular.module('app', []);
app.controller('BeersController', ['$http', function($http) {
  let mainRoute = 'http://localhost:3000/beers';
    this.beers = {};
    this.beers = ['beer'];
    this.getBeers = function() {
      $http.get(mainRoute)
      .then((result) => {
        this.beers = result.data.beers;
      }), function(error) {
      }
    }

    this.createBeer = function(beer) {
      $http.post(mainRoute, beer)
      .then((res) => {
        this.beers.push(res.data);
        this.newBeer = {};
      })
    }

    this.removeBeer = function(beer) {
      $http.delete(mainRoute + '/' + beer._id)
      .then((res) => {
        this.beers = this.beers.filter((b) => b._id != beer._id)
      })
    }
}]);
