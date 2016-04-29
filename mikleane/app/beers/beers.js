(function(){
'use strict';
require('angular-route')

var app = angular.module('beers')

require(__dirname + '/../services/http_service')(app);

  app.controller('BeersController',['$http', 'ResourceService', function($http, ResourceService) {
    var vm = this;
    const beersResource = ResourceService('beers');

      vm.beers = {};
      vm.beers = ['beer'];
      vm.getBeers = function() {
        beersResource.getAll()
        .then((result) => {
          vm.beers = result.data.beers;
        }), function(error) {
        };
      };

    vm.createBeer = function(beer) {
      beersResource.create(beer)
      .then((res) => {
        vm.beers.push(res.data);
        vm.newBeer = {};
      })
    }

    vm.updateBeer = function(beer) {
      beersResource.update(beer)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
    });
    vm.updateBeer.displayed = null;
  };

    vm.resetBeer = function(beer) {
      beersResource.reset(beer)
        .then((res) => {
          vm.beers[vm.beers.indexOf(beer)] = res.data
        })
        .catch((err) => {
          console.log(err)
    });
  };

    vm.removeBeer = function(beer) {
      beersResource.remove(beer)
       .then((res) => {
        vm.beers = vm.beers.filter((b) => b._id != beer._id)
      })
    }
}]);

})();
