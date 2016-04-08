const angular = require('angular');

const app = angular.module(MovieApp, []);
app.controller('MovieController', ['$http', function($http) {
  const movieRoute = 'http://localhost:3000/movies';
  this.fnord = 'FNORD FNORD FNORD';
  this.movies = ['a movie'];
  this.getMovies = function() {
    $http.get(movieRoute)
    .then((res) => {
      this.movies = res.data.movies;
    }, {
      function(error) {
        console.error(error);
      }
    })
  }
  this.createMovie = function(movie) {
    $http.post(movieRoute, movie)
    .then((res) => {
      this.movies.push(movie)
      this.newMovie = {};
    })
  }
  this.removeMovie = function(movie) {
    $http.delete(movieRoute + '/' + movie._id)
    .then((res) => {
      this.this.movies = this.movies.filter((mov) => mov._id != movie._id);
    })
  }
}])
