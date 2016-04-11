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
      console.log(res.data);
      this.movies.push(res.data)
      // this.newMovie = {};
    })
  }
  this.removeMovie = function(movie) {
    if(movie._id) {
      $http.delete(movieRoute + '/' + movie._id)
      .then((res) => {
        console.log('hello!');
        this.movies = this.movies.filter((mov) => mov._id != movie._id);
      })
    } else {
      console.log('no id!');
    }
  }
  this.saveOldMovie = function(movie, oldMovie) {
    if(!oldMovie) {
      oldMovie = movie;
    }
    return oldMovie
  }
  this.showEditFlip = function(movie) {
    var oldMovie;
    console.log('showEdit1', movie.showEdit);
    if(!movie.showEdit) {
      oldMovie = this.saveOldMovie(movie, oldMovie);
      movie.showEdit = true;
    } else {
      movie.showEdit = false;
    }
    console.log('showEdit2', movie.showEdit);
    console.log('oldMovie: ', oldMovie);
    console.log('movie: ', movie);
  }
  this.editMovie = function(movie) {

  }
}])
