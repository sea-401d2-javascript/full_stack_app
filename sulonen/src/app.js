'use strict';

const angular = require('angular');
const server = 'http://localhost:3000';
var token = '';

var app = angular.module('RESTApp', []);

app.run(function getToken($http) {
  $http({
    method: 'POST',
    url: server + '/signup',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      username: 'Donald Knuth',
      email: 'taocp@cs.stanford.edu',
      password: 'grammar12'
    }
  }).then(function successCallback(response) {
    console.log(response);
    token = response.data.token;
  }, function errorCallback(response) {
    if (response) {
      $http({
        method: 'GET',
        url: server + '/signin',
        headers: {
          'Content-type': 'application/json',
          'Authorization': 'Basic dGFvY3BAY3Muc3RhbmZvcmQuZWR1OmdyYW1tYXIxMg==' 
        },
        data: {
          username: 'Donald Knuth',
          email: 'taocp@cs.stanford.edu',
          password: 'grammar12'
        }
      }).then(function successCallback(response) {
        console.log(response);
        token = response.data.token;
      }, function errorCallback(response) {
        console.log(response);
      });
    }
  });
});

app.controller('BarController', ['$http', function($http) {
  // vm from mvvm - the view's model
  var vm = this;
  vm.header = 'Bars';
  vm.bars = [];

  vm.createBar = function(bar) {
    $http({
      method: 'POST',
      url: server + '/bars',
      headers: {
        'Content-type': 'application/json',
        'token': token
      },
      data: {
        name: bar.name,
        neighborhood: bar.neighborhood,
        hours: bar.hours
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallback(response) {
      console.log(response);
    });
  };
}]);

