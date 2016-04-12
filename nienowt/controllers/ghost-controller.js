'use strict';
(function(){

require('angular');

angular.module('app',[])
  .controller('GhostController',['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/ghosts';
    this.ghosts = ['ghost'];
    this.editShow = 'new';
    this.editConfirmation;
    this.newGhost = {};
    this.changedGhost = {};

    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    };

    this.confirmChange = function(ghost, buttonName, curGhost){
      if (!this.editConfirmation) return this.editConfirmation = true;

      if(buttonName === 'delete') return this.removeGhost(ghost);
      if(buttonName === 'edit') return this.editGhost(ghost, curGhost);
    };

    this.getGhosts = function() {
      $http.get(mainRoute)
      .then((results) => {
        console.log(results);
        this.ghosts = results.data;
        console.log(results.data);
      },(err) => {
        if (err) console.log(err);
      });
    };

    this.createGhost = function(ghost) {
      $http.post('http://localhost:3000/pub/new-ghost', ghost)
      .then(() => {
        this.ghosts.push(ghost);
        this.newGhost = {};
      });
    };

    this.editGhost = function(changedGhost, ghost){
      $http.put(mainRoute + '/' + ghost._id, changedGhost)
      .then(() => {
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
        this.ghosts.push(changedGhost);
      });
    };

    this.removeGhost = function(ghost){
      $http.delete(mainRoute + '/' + ghost._id)
      .then(() => {
        this.ghosts = this.ghosts.filter((g) => g._id != ghost._id);
      });
    };
              // doesnt work?
    this.reset = function(){
      this.editShow = 'new';
      this.editconfirmation = !this.editconfirmation;
      this.changedGhost = {};
    };
  }])
  .controller('TabController', function(){
    this.tab = 'ghosts';
    this.setTab = function(tab){
      this.tab = tab;
    };
    this.active = function(tab){
      return this.tab == tab;
    };
  })
  .controller('HumanController', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/humans';
    this.humans = ['human'];
    this.editShow = 'new';
    this.newHuman = {};
    this.editconfirmation;
    this.changedHuman = {};
    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    };
    this.confirmChange = function(human, buttonName, curHuman){
      if (!this.editConfirmation) return this.editConfirmation = true;
      if(buttonName === 'delete') return this.removeHuman(human);
      if(buttonName === 'edit') return this.editHuman(human, curHuman);
    };

    this.getHumans = function() {
      $http.get(mainRoute)
      .then((results) => {
        console.log(results);
        this.humans = results.data;
        console.log(results.data);
      },(err) => {
        if (err) console.log(err);
      });
    };
    this.createHuman = function(human) {
      $http.post(mainRoute, human)
      .then(() => {
        this.humans.push(human);
        this.newHuman = {};
      });
    };
    this.editHuman = function(changedHuman, human){
      $http.put(mainRoute + '/' + human._id, changedHuman)
      .then(() => {
        this.humans = this.humans.filter((g) => g._id != human._id);
        this.humans.push(changedHuman);
      });
    };
    this.removeHuman = function(human){
      $http.delete(mainRoute + '/' + human._id)
      .then(() => {
        this.humans = this.humans.filter((g) => g._id != human._id);
      });
    };
    this.reset = function(){
      this.editShow = 'new';
      this.changedHuman = {};
      this.editConfirmation = false;
    };
  }]);
})()
