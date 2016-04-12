'use strict';

const angular = require('angular');
const app = angular.module('ArcadeApp', []);

app.controller('ArcadeController', ['$scope','$http', function($scope, $http){
  console.log('marker 1');
  const arcadeRoute = 'http://localhost:5000/arcades';
  $scope.dance = 'Add New Arcade';
  this.arcades = ['arcade'];
  this.newArcade = {};

  this.getArcades = function(){
    $http.get(arcadeRoute)
    .then((result)=>{
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
      this.arcades = this.arcades.filter((a)=> a._id !=arcade._id);
    });
  };
  this.updateArcade = function(arcade){
    if(arcade._id){
      $http.put(arcadeRoute + '/' + arcade._id, arcade)
      .then((res)=>{
        console.log('updating');
        this.arcades = this.arcades.map((res)=>{
          if(res._id === arcade._id) {
            return arcade;
          } else {
            return res;
          }
        });
      });
    }
  };
  this.cancelUpdate = function(arcEdit, arcade){
    console.log(arcEdit);
    arcEdit._id = arcade._id;
    arcEdit.name = arcade.name;
    arcEdit.address = arcade.address;
    arcEdit.hours = arcade.hours;
  };
}]);
