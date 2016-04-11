'use strict';

const angular = require('angular');

const app = angular.module('ArcadeApp', []);
app.controller('ArcadeController', ['$http','$scope', function($http, $scope){
  console.log('marker1');

  const arcadeRoute = 'http://localhost:5000/arcades';
  $scope.dance = 'Add New Arcade';
  // this.test = 'TEST';
  this.arcades = ['arcade'];
  // this.arcades = result.data.name;
  this.getArcades = function(){
    $http.get(arcadeRoute)
    .then((result)=>{
      // console.log('ARCADE NAME: ' + result);
      this.arcades = result.data.data;
    }, function(error){
      console.log(error);
    });
  };
  this.createArcade = function(arcade){
    $http.post(arcadeRoute, arcade)
      .then((res)=>{
    // console.log('create ' + arcade);
    console.log(res.data);
        this.arcades.push(res.data);

        // res.end();
        // $scope.newArcade = {};
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
