module.exports = function(app) {

  app.directive('navBar', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './navbar.html'
    };
  });

}
