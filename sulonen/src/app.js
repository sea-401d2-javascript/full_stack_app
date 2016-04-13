'use strict';

const angular = require('angular');
const server = 'http://localhost:3000';

var app = angular.module('RESTApp', []);

app.controller('BarController', ['$http', function($http) {
  var vm = this;
  vm.header = 'Bars';
  vm.bars = [{name: 'Create a new bar!'}];

  vm.getBars = function() {
    $http({
      method: 'GET',
      url: server + '/bars',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function successCallback(response) {
      if (response.data.data.length) {
        vm.bars = response.data.data;
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  vm.createBar = function(bar) {
    $http({
      method: 'POST',
      url: server + '/bars',
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        name: bar.name,
        neighborhood: bar.neighborhood,
        hours: bar.hours
      }
    }).then(function successCallback(response) {
      vm.bars.push(response.data);
      if (vm.bars.length == 2) vm.bars.shift();
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  vm.updateBar = function(bar) {
    console.log(bar);
    $http({
      method: 'PUT',
      url: server + '/bars/' + bar._id,
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        name: bar.name,
        neighborhood: bar.neighborhood,
        hours: bar.hours
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallBack(response) {
      console.log(response);
    });
  };

  vm.resetForm = function(bar) {
    $http({
      method: 'GET',
      url: server + '/bars/' + bar._id,
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function successCallback(response) {
      console.log(response);
      var index = 0;
      for (var i = 0; i < vm.bars.length; i++) {
        if (vm.bars[i]._id === bar._id) {
          index = i;
          break;
        }
      }
      vm.bars[index] = response.data;
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  vm.deleteBar = function(bar) {
    $http({
      method: 'DELETE',
      url: server + '/bars/' + bar._id,
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function successCallback(response) {
      console.log(response);
      var index = 0;
      for (var i = 0; i < vm.bars.length; i++) {
        if (vm.bars[i]._id === bar._id) {
          index = i;
          break;
        }
      }
      vm.bars.splice(index, 1);
    }, function errorCallback(response) {
      console.log(response);
    });
  };
}]);

app.controller('BandController', ['$http', function($http) {
  var vm = this;
  vm.header = 'Bands';
  vm.bands = [{name: 'Create a new band!'}];

  vm.getBands = function() {
    $http({
      method: 'GET',
      url: server + '/bands',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function successCallback(response) {
      if (response.data.data.length) {
        vm.bars = response.data.data;
      }
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  vm.createBand = function(band) {
    $http({
      method: 'POST',
      url: server + '/bands',
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        name: band.name,
        city: band.city,
        country: band.country,
        genre: band.genre,
        bar: band.bar 
      }
    }).then(function successCallback(response) {
      vm.bands.push(response.data);
      if (vm.bands.length == 2) vm.bands.shift();
    }, function errorCallback(response) {
      console.log(response);
    });
  };

  vm.updateBand = function(band) {
    console.log(band);
    $http({
      method: 'PUT',
      url: server + '/bands/' + band._id,
      headers: {
        'Content-type': 'application/json'
      },
      data: {
        name: band.name,
        city: band.city,
        country: band.country,
        genre: band.genre,
        bar: band.bar 
      }
    }).then(function successCallback(response) {
      console.log(response);
    }, function errorCallBack(response) {
      console.log(response);
    });
  };

  vm.resetForm = function(band) {
    $http({
      method: 'GET',
      url: server + '/bars/' + band._id,
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function successCallback(response) {
      console.log(response);
      var index = 0;
      for (var i = 0; i < vm.bands.length; i++) {
        if (vm.bands[i]._id === band._id) {
          index = i;
          break;
        }
      }
      vm.bands[index] = response.data;
    }, function errorCallback(response) {
      band = {};
      console.log(response);
    });
  };

  vm.deleteBand = function(band) {
    $http({
      method: 'DELETE',
      url: server + '/bands/' + band._id,
      headers: {
        'Content-type': 'application/json'
      }
    }).then(function successCallback(response) {
      console.log(response);
      var index = 0;
      for (var i = 0; i < vm.bands.length; i++) {
        if (vm.bands[i]._id === band._id) {
          index = i;
          break;
        }
      }
      vm.bands.splice(index, 1);
    }, function errorCallback(response) {
      console.log(response);
    });
  };
}]);

