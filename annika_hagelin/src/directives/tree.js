module.exports = function(app) {

  app.directive('tree', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './directives/templates/tree.html'
    }
  });

}
