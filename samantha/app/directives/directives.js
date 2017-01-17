// var app = angular.module('ChefApp', []);
module.exports = function(ChefApp) {

  ChefApp.directive('myFooter', function(){
    return {
      restrict: 'E',
      scope: {
        year: '='
      },
      replace: true,
      template: '<footer> &copy Samantha Prince | {{year}} </footer>'
    };
  });

  ChefApp.directive('browniesEaten', function() {
    return {
      restrict: 'E',
      scope: {
        total: '='
      },
      replace: true,
      template: '<section> How many brownies have you eaten today? {{total}} <button ng-click="plusOne()"> add 1 </button></section>',
      controller: function($scope) {
        $scope.plusOne = function() {
          $scope.total += 1;
        };
      }
    };
  });

};
