module.exports = function(app) {

  app.directive('species', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/species.html'
    }
  });

}
