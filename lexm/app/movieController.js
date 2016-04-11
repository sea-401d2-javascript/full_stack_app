module.exports = (app) => {
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
    if(movie.showEdit === undefined) {
      oldMovie = this.saveOldMovie(movie, oldMovie);
      movie.showEdit = true;
    } else if (!movie.showEdit) {
      movie.showEdit = true;
    } else {
      movie.showEdit = false;
    }
    console.log('showEdit2', movie.showEdit);
    console.log('oldMovie: ', oldMovie);
    console.log('movie: ', movie);
  }
  this.putMovie = function(movEdit) {
    if(movEdit._id) {
      $http.put(movieRoute + '/' + movEdit._id, movEdit)
      .then((res) => {
        this.movies = this.movies.map((mov) => {
          if(mov._id === movEdit._id) {
            return movEdit;
          } else {
            return mov;
          }
        })
        console.log('res.data: ', res.data);
        console.log('movEdit: ', movEdit);
        console.log('this.movies: ', this.movies);
      })
    } else {
      console.log('no id!');
      console.log('movEdit: ', movEdit);
    }
  }
  this.cancelEdit = function(movEdit, movie) {
    movEdit._id = movie._id;
    movEdit.name = movie.name;
    movEdit.release_date = movie.release_date;
    console.log('cE movEdit: ', movEdit);
    console.log('cE movie: ', movie);
  }
}])

}
