'use strict';
var angular = require('angular');
require('./layout.css');


var app = angular.module('myApp', []);

app.controller('ContinentCtrl',['$http', function($http){
  var mainRoute = 'http://localhost:3000/continents';
  var self = this;
  this.continentsList = [];
  this.continents = [];
  this.newConts = {
    country: '',
    region: '',
    mineral: ''
  }
  this.getCont = {};
  this.id = ''
  this.editing = false;
  this.buttonShow = false;
  this.fetchedData = [];
  this.cancelEdits = function(){
    this.getCont = this.fetchedData;
    console.log('back to original : ' + angular.toJson(this.fetchedData));
  }

  this.getContinents = function(){
    $http.get(mainRoute)
    .then((result)=>{
      console.log('Here is result ' + result);
      this.continentsList = result.data;
    }, function(err){
      console.log(err);
    })
  }
  this.getByIdContinents = function(){
      $http.get(mainRoute + '/'+ this.id)
      .then((result)=>{
        this.buttonShow = true;
        this.getCont = result.data;
        this.fetchedData = angular.copy(result.data);
        console.log('Fetched data : ' + angular.toJson(this.fetchedData));
      }, function(err){
        console.log(err);
      })
  }

  this.createContinents = function(){
    $http.post(mainRoute, this.newConts)
    .then((result)=>{
      this.continents = angular.toJson(result.data);
      console.log('Here is fromDB : ' + this.continents);
    },function(err){
      console.log('err : ' + err);
    })
  }
  this.editContinents = function(){
    $http.put(mainRoute +'/'+ this.id, this.getCont)
    .then((result)=>{
      this.getCont = result.data;
      this.status = 'Successfully updated : ' + angular.toJson(this.getCont);
      console.log('Here is result of PUT : ' + angular.toJson(this.getCont));
    }, function(err){
      console.log('err : ' + err);
    })
  }

  this.deleteContinentById = function(){
    $http.delete(mainRoute + '/'+ this.id, this.getCont)
    .then((result)=>{
      this.getCont = this.data;
      this.status = 'Successfully deleted : ' + angular.toJson(this.getCont);
    })
  }
}]);

app.controller('gemsController',['$http',function($http){
  var mainRoute = 'http://localhost:3000/gems'
  this.gemsList = [];
  this.gems = [];
  this.newGem = {
    name: '',
    color: '',
    density: ''
  }
  this.getGem = {}
  this.id = ''
  this.editing = false;

  this.getGems = function(){
    $http.get(mainRoute)
    .then((result)=>{
      this.gemsList = result.data;
      console.log('Here is gemsList : ' + this.gemsList);
    }, function(err){
      console.log('Err : ' + err);
    });
  }

  this.createGems = function(){
    $http.post(mainRoute, this.newGem)
    .then((result)=>{
      this.gems = result.data;
      console.log('Here is new Gem! : ' + this.gems);
    }, function(err){
      console.log('Err : ' + err);
    })
  }
}])
