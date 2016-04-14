(function(){

angular.module('beers')
  .controller('BeersController',['$http', function($http) {
    let mainRoute = 'http://localhost:3000/beers';
      this.beers = {};
      this.beers = ['beer'];
      this.getBeers = function() {
        $http.get(mainRoute)
        .then((result) => {
          this.beers = result.data.beers;
        }), function(error) {
        };
      };

    this.createBeer = function(beer) {
      $http.post(mainRoute, beer)
      .then((res) => {
        this.beers.push(res.data);
        this.newBeer = {};
      })
    }

    this.updateBeer = function(beer) {
      $http.put(mainRoute + '/' + beer._id, beer)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
    });
    this.updateBeer.displayed = null;
  };

    this.resetBeer = function(beer) {
      $http.get(mainRoute +'/'+ beer._id)
        .then((res) => {
          this.beers[this.beers.indexOf(beer)] = res.data
        })
        .catch((err) => {
          console.log(err)
    });
  };

    this.removeBeer = function(beer) {
      $http.delete(mainRoute + '/' + beer._id)
      .then((res) => {
        this.beers = this.beers.filter((b) => b._id != beer._id)
      })
    }
}]);

})();
