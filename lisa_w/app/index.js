'use strict';

const angular = require('angular');
const app = angular.module('ArcadeApp', []);

app.controller('ArcadeController', ['$scope','$http', function($scope, $http){
  const arcadeRoute = 'http://localhost:5000/arcades';
  $scope.dance = 'Add New Arcade';
  this.arcades = ['arcade'];
  this.isHidden = true;
  this.newArcade = {};
  this.cancelEdit = {};
  this.updateArcade = {};
  this.showItem = function (){
    this.isHidden = this.isHidden ? false:true;
  };
  this.getArcades = function(){
    $http.get(arcadeRoute)
    .then(function(result){
      this.arcades = result.data.arcades;
      this.cancelEdit = angular.copy(this.arcades);
    }, function(error){
      console.log(error);
    });
  };
  this.createArcade = function(arcade){
    $http.post(arcadeRoute, arcade)
      .then(function(res){
        console.log(res.data);
        this.arcades.push(res.data);
      });
  };
  this.removeArcade = function(arcade) {
    $http.delete(arcadeRoute + '/' + arcade._id)
    .then(function(res){
      console.log('removing');
      console.log(res.data);
      this.arcades = this.arcades.filter((a)=> a._id !=arcade._id);
    });
  };
  this.updateArcade = function(arcade){
    if(arcade._id){
      $http.put(arcadeRoute + '/' + arcade._id, arcade)
      .then(function(res){
        console.log('updating');
        this.arcades = this.arcades.map(res);

      });
    }
  };
  this.cancelUpdate = function(arcade){
    console.log(this.cancelEdit);
    this.cancelEdit = arcade;
  };
}]);
