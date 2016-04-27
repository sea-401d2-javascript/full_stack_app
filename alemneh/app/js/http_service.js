module.exports = function(app) {

  app.factory('EndpointService', ['$http', function($http) {
    const mainEndpoint = 'http://localhost:3000/';

    function Endpoint(endpointName, endpointName2) {
      this.endpointName = endpointName;
      this.endpointName2 = endpointName2;
    }

    Endpoint.prototype.summon = function() {
      return $http.get(mainEndpoint + this.endpointName);
    };

    Endpoint.prototype.assemble = function(data) {
      return $http.post(mainEndpoint + this.endpointName, data);
    };

    Endpoint.prototype.destroy =  function(data) {
      return $http.delete(mainEndpoint + this.endpointName + '/' + data._id);
    };

    Endpoint.prototype.update = function(data) {
      return $http.put(mainEndpoint + this.endpointName + '/' + data._id, data);
    };

    Endpoint.prototype.summonSub = function(data) {
      return $http.get(mainEndpoint + this.endpointName + '/' + data._id + '/' + this.endpointName2);
    };

    Endpoint.prototype.assembleSub = function(data, data2) {
      return $http.post(mainEndpoint + this.endpointName + '/' + data._id +  '/' + this.endpointName2, data2);
    };

    Endpoint.prototype.destroySub = function(data, data2) {
      return $http.delete(mainEndpoint + this.endpointName + '/' + data._id + '/' + this.endpointName2 + '/' + data2._id);
    };

    Endpoint.prototype.updateSub = function(data, data2) {
      return $http.put(mainEndpoint + this.endpointName + '/' + data._id + '/' + this.endpointName2 + '/' + data2._id, data2);
    };

    return function(endpointName, endpointName2) {
      return new Endpoint(endpointName, endpointName2);
    };

  }]);
};
