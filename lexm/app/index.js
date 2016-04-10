const angular = require('angular');
const moment = require('moment');
const angularMoment = require('angular-moment');

const app = angular.module('MovieApp', ['angularMoment']);
app.controller('MovieController', ['$scope', '$http', function($scope, $http) {
  const movieRoute = 'http://localhost:3000/movies';
  $scope.fnord = 'FNORD FNORD FNORD';
  this.movies = ['movie'];
  this.getMovies = function() {
    $http.get(movieRoute)
    .then((res) => {
      this.movies = res.data.data;
    },
      function(error) {
        console.error(error);
      }
    )
  }
  this.createMovie = function(movie) {
    $http.post(movieRoute, movie)
    .then((res) => {
      this.movies.push(movie)
      this.newMovie = {};
    })
  }
  this.removeMovie = function(movie) {
    console.log(movie._id);
    $http.delete(movieRoute + '/' + movie._id)
    .then((res) => {
      console.log('hello!');
      console.log(res.data);
      this.movies = this.movies.filter((mov) => mov._id != movie._id);
    })
  }
}])
