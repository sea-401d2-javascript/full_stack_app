module.exports = function(app) {

  app.directive('login', function() {
    return {
      return: 'E',
      templateUrl: './views/login-view.html'
    };
  });

};
