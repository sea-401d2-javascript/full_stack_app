module.exports = function(app) {
  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var url = require('../../config.js').serverPath;

    var token;
    var auth = {
      
    }
    return auth;
  }]);
}
