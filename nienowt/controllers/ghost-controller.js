'use strict';
require('angular');

angular.module('app',[])
  .controller('GhostController',['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/ghosts';
    this.angTest = 'TOO GOOD ???';
    this.ghosts = ['ghost'];
    this.getGhosts = function() {
      $http.get(mainRoute)
      .then((results) => {
        console.log(results);
        this.ghosts = results.data;
        console.log(results.data)
      },(err) => {
        if (err) console.log(err);
      })
    }
    this.createGhost = function(ghost) {
      $http.post('http://localhost:3000/pub/new-ghost', ghost)
      .then((res) => {
        this.ghosts.push(ghost)
        this.newGhost = {}
      })
    }
  }])
