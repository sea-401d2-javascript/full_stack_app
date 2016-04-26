(function(app) {
  angular.module('customers')
  .factory('ResourceService', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/';

    function Resource(resourceName) {
      this.resourceName = resourceName;
    }

    Resource.prototype.getAll = function() {
      return $http.get(mainRoute + this.resourceName);
    };

    Resource.prototype.create = function(data) {
      return $http.post(mainRoute + this.resourceName, data);
    };

    Resource.prototype.update = function(data) {
      return $http.put(mainRoute + this.resourceName + '/' + data._id, data);
    };

    Resource.prototype.remove = function(data) {
      return $http.delete(mainRoute + this.resourceName + '/' + data._id);
    };

    return function(resourceName) {
      return new Resource(resourceName);
    };

  }]);
})();
