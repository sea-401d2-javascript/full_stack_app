'use strict';
require('angular');

angular.module('app',[])
  .controller('GhostController',['$scope','$http', function($scope, $http) {
    const mainRoute = 'http://localhost:3000/api/ghosts';
    this.ghosts = ['ghost'];
    this.editShow = 'new';
    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    }

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
        $scope.newGhost = {};
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
              // doesnt work?
    this.reset = function(){
      this.editShow = 'new';
      return $scope.editConfirmation = false;
    }
  }])
  .controller('TabController', function(){
    this.tab = 'ghosts';
    this.setTab = function(tab){
      this.tab = tab;
    };
    this.active = function(tab){
      return this.tab == tab;
    }
  })
  .controller('HumanController', ['$scope', '$http', function($scope, $http) {
    const mainRoute = 'http://localhost:3000/api/humans';
    this.humans = ['human'];
    this.editShow = 'new';
    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    }
    this.confirmChange = function(human, buttonName, curHuman){
      if (!$scope.editConfirmation) return $scope.editConfirmation = true;
      if(buttonName === 'delete') return this.removeHuman(human);
      if(buttonName === 'edit') return this.editHuman(human, curHuman);
    }

    this.getHumans = function() {
      $http.get(mainRoute)
      .then((results) => {
        console.log(results);
        this.humans = results.data;
        console.log(results.data)
      },(err) => {
        if (err) console.log(err);
      })
    }
    this.createHuman = function(human) {
      $http.post(mainRoute, human)
      .then((res) => {
        this.humans.push(human)
        $scope.newHuman = {};
        $scope.humanForm.$setPristine();
      })
    }
    this.editHuman = function(changedHuman, human){
      $http.put(mainRoute + '/' + human._id, changedHuman)
      .then((res) => {
        this.humans = this.humans.filter((g) => g._id != human._id);
        this.humans.push(changedHuman);
      })
    }
    this.removeHuman = function(human){
      $http.delete(mainRoute + '/' + human._id)
      .then((res) => {
        this.humans = this.humans.filter((g) => g._id != human._id);
      })
    }
    this.reset = function(){
      this.editShow = 'new';
      return $scope.editConfirmation = false;
    }
  }])
