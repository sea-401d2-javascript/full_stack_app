'use strict';

const angular = require('angular');

const app = angular.module('ArcadeApp', []);
app.controller('ArcadeController', ['$scope','$http', function($scope, $http){
  console.log('marker1');

  const arcadeRoute = 'http://localhost:5000/arcades';
  $scope.dance = 'DANCE, DANCE';
  // this.test = 'TEST';
  this.arcade = [];
  // this.arcades = result.data.name;
  this.getArcade = function(){
    $http.get(arcadeRoute)
    .then((result)=>{
      console.log('ARCADE NAME: ' + result);
      this.arcade = result.name;
    }, function(error){
      console.log(error);
    });
  };
  this.createArcade = function(arcade){
    $http.post(arcadeRoute, arcade)
      .then((res)=>{
        console.log(res.data);
        this.arcade.push(res.data);
        this.newArcade = {};
      });

  };
  this.removeArcade = function(arcade) {
    $http.delete(arcadeRoute + '/' + arcade._id)
    .then((res)=>{
      console.log('removing')
      console.log(res.data);
      ;
      this.arcade = this.arcade.filter((a)=> a._id !=arcade._id);
    });
  };
}]);
