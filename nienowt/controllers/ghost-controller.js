'use strict';
require('angular');

angular.module('app',[])
  .controller('GhostController',['$scope','$http', function($scope, $http) {
    const mainRoute = 'http://localhost:3000/api/ghosts';
    this.angTest = 'TOO GOOD ???';
    this.ghosts = ['ghost'];
    this.confirmChange = function(ghost, buttonName, curGhost){
      if (!$scope.editConfirmation) return $scope.editConfirmation = true;
      if(buttonName === 'delete') return this.removeGhost(ghost);
      if(buttonName === 'edit') return this.editGhost(ghost, curGhost);
    }
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
        $scope.newGhost = {}
        $scope.newForm.$setPristine();
      })
    }
    this.editGhost = function(changedGhost, ghost){
      $http.put(mainRoute + '/' + ghost._id, changedGhost)
      .then((res) => {
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
        this.ghosts.push(changedGhost);
      })
    }
    this.removeGhost = function(ghost){
      $http.delete(mainRoute + '/' + ghost._id)
      .then((res) => {
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
      })
    }
  }])
