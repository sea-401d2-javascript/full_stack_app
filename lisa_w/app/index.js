'use strict';
const angular = require('angular');
const app = angular.module('ArcadeApp', []);
app.controller('ArcadeController', ['$http', function($http){
  const mainRoute = 'http://localhost:5000/arcades';
  this.test = 'TEST';
  this.arcades = ['Arcade'];
  this.getArcade = function(){
    $http.get(mainRoute)
    .then((result)=>{
      console.log(result.data.arcades);
      this.arcades = result.data.arcades;
    }, function(err){
      console.log(err);
    });
  };
  this.createArcade = function(arcade){
    $http.post(mainRoute, arcade)
  .then((res)=>{
    this.arcade.push(arcade);
    this.newArcade = {};
    return res();
  });

  };
}]);
