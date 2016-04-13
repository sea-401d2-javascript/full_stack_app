'use strict';
let angular = require('angular');

require(__dirname + '/../build/beaut.css')

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
      };
    };

    this.createBeer = function(beer) {
      $http.post(mainRoute, beer)
      .then((res) => {
        this.beers.push(res.data);
        this.newBeer = {};
      })
    }

    this.updateBeer = function(beer) {
      $http.put(mainRoute + '/' + beer._id, beer)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
    });
    this.updateBeer.displayed = null;
  };

    this.resetBeer = function(beer) {
      $http.get(mainRoute +'/'+ beer._id)
        .then((res) => {
          this.beers[this.beers.indexOf(beer)] = res.data
        })
        .catch((err) => {
          console.log(err)
    });
  };

    this.removeBeer = function(beer) {
      $http.delete(mainRoute + '/' + beer._id)
      .then((res) => {
        this.beers = this.beers.filter((b) => b._id != beer._id)
      })
    }
}]);

app.controller('UsersController', ['$http', function($http) {
  let userRoute = 'http://localhost:3000/users';
    this.users = {};
    this.users = ['user'];
    this.getUsers = function() {
      $http.get(userRoute)
      .then((result) => {
        this.users = result.data.users;
      }), function(error) {
      };
    };

    this.createUser = function(user) {
      console.log('user ', user)
      $http.post(userRoute, user)
      .then((res) => {
        this.users.push(res.data);
        this.newUser = {};
      })
    }

    this.updateUser = function(user) {
      $http.put(userRoute + '/' + user._id, user)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
    });
    this.updateUser.displayed = null;

  };

    this.resetUser = function(user) {
      $http.get(userRoute +'/'+ user._id)
        .then((res) => {
          this.users[this.users.indexOf(user)] = res.data
        })
        .catch((err) => {
          console.log(err)
    });
  };

    this.removeUser = function(user) {
      $http.delete(userRoute + '/' + user._id)
      .then((res) => {
        this.users = this.users.filter((u) => u._id != user._id)
      })
    }
  }]);
