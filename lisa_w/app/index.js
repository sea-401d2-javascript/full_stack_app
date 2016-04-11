'use strict';

const angular = require('angular');

const app = angular.module('ArcadeApp', []);
app.controller('ArcadeController', ['$scope','$http', function($scope, $http){

  console.log('marker1');

  const arcadeRoute = 'http://localhost:5000/arcades';
  $scope.dance = 'Add New Arcade';
  this.arcades = ['arcade'];
  this.newArcade = {};

  this.getArcades = function(){
    $http.get(arcadeRoute)
    .then((result)=>{
      debugger;
      this.arcades = result.data.arcades;
    }, function(error){
      console.log(error);
    });
  };
  this.createArcade = function(arcade){
    $http.post(arcadeRoute, arcade)
      .then((res)=>{
        console.log(res.data);
        this.arcades.push(res.data);


      });

  };
  this.removeArcade = function(arcade) {
    $http.delete(arcadeRoute + '/' + arcade._id)
    .then((res)=>{
      console.log('removing');
      console.log(res.data);

      this.arcades = this.arcades.filter((a)=> a._id !=arcade._id);
    });
  };
}]);
