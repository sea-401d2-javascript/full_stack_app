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
    console.dir('NEW ID : ' + angular.toJson(this.id));
    console.dir('NEW URL : ' + mainRoute + '/'+ this.id);
    console.dir('GETCONT : ' + angular.toJson(this.getCont));
      $http.get(mainRoute + '/'+ this.id)
      .then((result)=>{
        console.log('Here is result by id : ' + angular.toJson(result));
      }, function(err){
        console.log(err);
      })
  }

  this.createContinents = function(){
    $http.post(mainRoute, this.newConts)
    .then((res)=>{
      this.continents = angular.toJson(res.data);
      console.log('Here is fromDB : ' + this.continents);
    },function(err){
      console.log('err : ' + err);
    })
  }
  // this.editContinents = function(){
  //   $http.put(mainRoute, this.)
  // }
}]);
