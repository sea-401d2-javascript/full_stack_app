module.exports = function(app) {

  app.directive('tree', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: './templates/tree.html'
    }
  });

}
