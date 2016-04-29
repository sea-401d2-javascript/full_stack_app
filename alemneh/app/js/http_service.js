module.exports = function(app) {

  app.factory('EndpointService', ['$http', function($http) {
    const mainEndpoint = 'http://localhost:3000/';

    function Endpoint(endpointName, endpointName2) {
      this.endpointName = endpointName;
      this.endpointName2 = endpointName2;
    }

    Endpoint.prototype.summon = function(token) {
      console.log('service');
      return $http.get(mainEndpoint + this.endpointName, {
        headers: {
          token: token
        }
      });
    };

    Endpoint.prototype.assemble = function(data) {
      return $http.post(mainEndpoint + this.endpointName, data);
    };

    Endpoint.prototype.destroy =  function(data, token) {
      return $http.delete(mainEndpoint + this.endpointName + '/' + data._id, {
        headers: {
          token: token
        }
      });
    };

    Endpoint.prototype.update = function(data, token) {
      return $http.put(mainEndpoint + this.endpointName + '/' + data._id, data, {
        headers: {
          token: token
        }
      });
    };

    Endpoint.prototype.summonSub = function(data, token) {
      return $http.get(mainEndpoint + this.endpointName + '/' + data._id + '/' + this.endpointName2, {
        headers: {
          token: token
        }
      });
    };

    Endpoint.prototype.assembleSub = function(data, data2, token) {
      return $http.post(mainEndpoint + this.endpointName + '/' + data._id +  '/' + this.endpointName2, data2, {
        headers: {
          token: token
        }
      });
    };

    Endpoint.prototype.destroySub = function(data, data2, token) {
      return $http.delete(mainEndpoint + this.endpointName + '/' + data._id + '/' + this.endpointName2 + '/' + data2._id, {
        headers: {
          token: token
        }
      });
    };

    Endpoint.prototype.updateSub = function(data, data2, token) {
      return $http.put(mainEndpoint + this.endpointName + '/' + data._id + '/' + this.endpointName2 + '/' + data2._id, data2, {
        headers: {
          token: token
        }
      });
    };

    return function(endpointName, endpointName2) {
      return new Endpoint(endpointName, endpointName2);
    };

  }]);
};
