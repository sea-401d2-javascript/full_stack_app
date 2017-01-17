module.exports = (app) => {
  app.controller('MovieController', ['$http', function($http) {
    const movieRoute = 'http://localhost:3000/movies';
    this.movies = ['movie'];
    this.getMovies = function() {
      $http.get(movieRoute)
      .then((res) => {
        this.movies = res.data.data;
      },
      function(error) {
        console.error(error);
      }
    );
    };
    this.createMovie = function(movie) {
      $http.post(movieRoute, movie)
      .then((res) => {
        this.movies.push(res.data);
      });
    };
    this.removeMovie = function(movie) {
      if(movie._id) {
        $http.delete(movieRoute + '/' + movie._id)
        .then((res) => {
          this.movies = this.movies.filter((mov) => mov._id != movie._id);
        });
      } else {
        console.log('no id!');
      }
    };
    this.saveOldMovie = function(movie, oldMovie) {
      if(!oldMovie) {
        oldMovie = movie;
      }
      return oldMovie;
    };
    this.showEditFlip = function(movie) {
      var oldMovie;
      if(movie.showEdit === undefined) {
        oldMovie = this.saveOldMovie(movie, oldMovie);
        movie.showEdit = true;
      } else if (!movie.showEdit) {
        movie.showEdit = true;
      } else {
        movie.showEdit = false;
      }
    };
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
          });
        });
      }
    };
    this.cancelEdit = function(movEdit, movie) {
      movEdit._id = movie._id;
      movEdit.name = movie.name;
      movEdit.release_date = movie.release_date;
    };
  }]);
};
