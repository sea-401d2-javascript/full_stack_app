'use strict';
var angular = require('angular');

var app = angular.module('myApp', []);

app.controller('ContinentCtrl',['$http', function($http){
  var mainRoute = 'http://localhost:3000/continents';
  var self = this;
  this.test = [];
  this.continents = [];
  this.newConts = {
    country: ''
  }
  this.getContinents = function(){
    $http.get(mainRoute)
    .then((result)=>{
      console.log('Here is result ' + result);
      // this.continents = result.data
    }, function(err){

    })
  }
  this.createContinents = function(){
    // console.log('This is incoming data : ' + incomingContData);
    console.dir('Here is conts array : ' + angular.toJson(this.newConts));
    $http.post(mainRoute, this.newConts)
    .then((res)=>{
      this.continentsFromDb = angular.toJson(res.data);
      console.log('Here is fromDB : ' + this.continentsFromDb);

      this.newContinent = {};
    },function(err){
      console.log('err : ' + err);
    })
  }
}]);
