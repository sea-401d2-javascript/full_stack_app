'use strict';
var angular = require('angular');

var app = angular.module('myApp', []);

app.controller('ContinentCtrl',['$http', function($http){
  var mainRoute = 'http://localhost:3000/continents';
  var self = this;
  this.test = [];
  this.continents = [];
  this.getContinents = function(){
    $http.get(mainRoute)
    .then((result)=>{
      console.log('Here is result ' + result);
      // this.continents = result.data
    }, function(err){

    })
  }
  this.createContinents = function(incomingContData){
    $http.post(mainRoute, incomingContData)
    .then((res)=>{
      this.continentsFromDb = angular.toJson(res.data);
      console.log(this.continentsFromDb);
      this.newContinent = {};
    })
  }
}]);
