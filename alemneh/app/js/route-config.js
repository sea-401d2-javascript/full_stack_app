module.exports = function(app) {

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: './views/signin-view.html'
    }).when('/signin', {
      templateUrl: './views/signin-view.html'
    }).when('/signup', {
      templateUrl: './views/signup-view.html'
    }).when('/home', {
      templateUrl: './views/student-view.html',
      requireLogin: true
    });
  }]);

};
