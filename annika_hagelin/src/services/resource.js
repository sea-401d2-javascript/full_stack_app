module.exports = function(app) {
  app.factory('ResourceService', ['$http', 'AuthService', function($http, AuthService) {
    var mainRoute = require('../../config.js').serverPath;
    console.log('make resource service');

    function Resource(resource, data) {
      this.resource = resource;
      this.path = mainRoute + '/' + resource;
      console.log(this.path);
      this.data = data;
    }


    Resource.prototype.read = function() {
      console.log('read');
      console.log(this.data);
      $http.get(this.path, {
        headers: {
          token: AuthService.getToken()
        }
      })
        .then(res => {this.data.splice(0, this.data.length); Array.prototype.push.apply(this.data, res.data);})
        .catch(err => console.log(err));
    };

    Resource.prototype.reset = function(data) {
      console.log(data);
      $http.get(this.path +'/'+ data._id)
        .then(res => this.data[this.data.indexOf(data)] = res.data)
        .catch(err => console.log(err));
    };

    Resource.prototype.create = function(data) {
      $http.post(this.path, data)
        .then(res => this.data.push(res.data))
        .catch(err => console.log(err));
    };

    Resource.prototype.delete = function(data) {
      $http.delete(this.path+'/'+data._id)
        .then(res => this.data.splice(this.data.indexOf(data), 1))
        .catch(err => console.log(err));
    };

    Resource.prototype.update = function(data) {
      $http.put(this.path + '/' + data._id, data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    };
    Resource.prototype.update.displayed = null;

    return function(resource, data) {
      return new Resource(resource, data);
    }

  }]);
};
