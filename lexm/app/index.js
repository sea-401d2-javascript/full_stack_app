const angular = require('angular');
const moment = require('moment');
const angularMoment = require('angular-moment');

const app = angular.module('MovieApp', ['angularMoment']);

require('./movieController')(app);

// app.controller('MovieController', ['$scope', '$http', function($scope, $http) {
//   const movieRoute = 'http://localhost:3000/movies';
//   $scope.fnord = 'FNORD FNORD FNORD';
//   this.movies = ['movie'];
//   this.getMovies = function() {
//     $http.get(movieRoute)
//     .then((res) => {
//       this.movies = res.data.data;
//     },
//       function(error) {
//         console.error(error);
//       }
//     )
//   }
//   this.createMovie = function(movie) {
//     $http.post(movieRoute, movie)
//     .then((res) => {
//       console.log(res.data);
//       this.movies.push(res.data)
//       // this.newMovie = {};
//     })
//   }
//   this.removeMovie = function(movie) {
//     if(movie._id) {
//       $http.delete(movieRoute + '/' + movie._id)
//       .then((res) => {
//         console.log('hello!');
//         this.movies = this.movies.filter((mov) => mov._id != movie._id);
//       })
//     } else {
//       console.log('no id!');
//     }
//   }
//   this.saveOldMovie = function(movie, oldMovie) {
//     if(!oldMovie) {
//       oldMovie = movie;
//     }
//     return oldMovie
//   }
//   this.showEditFlip = function(movie) {
//     var oldMovie;
//     console.log('showEdit1', movie.showEdit);
//     if(movie.showEdit === undefined) {
//       oldMovie = this.saveOldMovie(movie, oldMovie);
//       movie.showEdit = true;
//     } else if (!movie.showEdit) {
//       movie.showEdit = true;
//     } else {
//       movie.showEdit = false;
//     }
//     console.log('showEdit2', movie.showEdit);
//     console.log('oldMovie: ', oldMovie);
//     console.log('movie: ', movie);
//   }
//   this.putMovie = function(movie) {
//     if(movie._id) {
//       $http.put(movieRoute + '/' + movie._id, movie)
//       .then((res) => {
//         this.movies = this.movies.map((mov) => {
//           if(mov._id === movie._id) {
//             return movie;
//           } else {
//             return mov;
//           }
//         })
//         console.log('res.data: ', res.data);
//         console.log('movie: ', movie);
//         console.log('this.movies: ', this.movies);
//       })
//     } else {
//       console.log('no id!');
//       console.log('movie: ', movie);
//     }
//   }
//   this.cancelEdit = function(movEdit, movie) {
//     movEdit._id = movie._id;
//     movEdit.name = movie.name;
//     movEdit.release_date = movie.release_date;
//     console.log('cE movEdit: ', movEdit);
//     console.log('cE movie: ', movie);
//   }
// }])
