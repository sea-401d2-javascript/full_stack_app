'use strict';
var angular = require('angular');
require('./layout.css');



var app = angular.module('myApp', []);

app.controller('ContinentCtrl',['$http', function($http){
  var mainRoute = 'http://localhost:3000/continents';
  // var idRoute = "'http://localhost:3000/continents/" + angular.toJson(this.id)"'";
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
    var test = angular.toJson(this.id);
      $http.get(mainRoute + '/'+ this.id)
      .then((result)=>{
        this.getCont = result.data;
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
}]);
