module.exports = (app) => {
  app.controller('DirectorController', ['$scope', '$http', function($scope, $http) {
    const directorRoute = 'http://localhost:3000/directors';
    $scope.fnord = 'FNORD FNORD FNORD';
    this.directors = ['director'];
    this.getDirectors = function() {
      $http.get(directorRoute)
      .then((res) => {
        this.directors = res.data.data;
      },
      function(error) {
        console.error(error);
      }
    )
  }
  this.createDirector = function(director) {
    $http.post(directorRoute, director)
    .then((res) => {
      console.log(res.data);
      this.directors.push(res.data)
      // this.newDirector = {};
    })
  }
  this.removeDirector = function(director) {
    if(director._id) {
      $http.delete(directorRoute + '/' + director._id)
      .then((res) => {
        console.log('hello!');
        this.directors = this.directors.filter((direc) => direc._id != director._id);
      })
    } else {
      console.log('no id!');
    }
  }
  this.saveOldDirector = function(director, oldDirector) {
    if(!oldDirector) {
      oldDirector = director;
    }
    return oldDirector
  }
  this.showEditFlip = function(director) {
    var oldDirector;
    console.log('showEdit1', director.showEdit);
    if(director.showEdit === undefined) {
      oldDirector = this.saveOldDirector(director, oldDirector);
      director.showEdit = true;
    } else if (!director.showEdit) {
      director.showEdit = true;
    } else {
      director.showEdit = false;
    }
    console.log('showEdit2', director.showEdit);
    console.log('oldDirector: ', oldDirector);
    console.log('director: ', director);
  }
  this.putDirector = function(direcEdit) {
    if(direcEdit._id) {
      $http.put(directorRoute + '/' + direcEdit._id, direcEdit)
      .then((res) => {
        this.directors = this.directors.map((direc) => {
          if(direc._id === direcEdit._id) {
            return direcEdit;
          } else {
            return direc;
          }
        })
        console.log('res.data: ', res.data);
        console.log('direcEdit: ', direcEdit);
        console.log('this.directors: ', this.directors);
      })
    } else {
      console.log('no id!');
      console.log('direcEdit: ', direcEdit);
    }
  }
  this.cancelEdit = function(direcEdit, director) {
    direcEdit._id = director._id;
    direcEdit.name = director.name;
    direcEdit.date_of_birth = director.date_of_birth;
    console.log('cE direcEdit: ', direcEdit);
    console.log('cE director: ', director);
  }
}])

}
