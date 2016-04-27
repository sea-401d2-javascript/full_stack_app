module.exports = function(app) {

app.directive('highlight', function() {
    return {
      scope: {},
      restrict: 'A',
      link: function($scope, element, attrs) {
        element.on('mouseover', function() {
          element.css({
            border: '3px solid Navy',
            width: '860px'
          })
        element.on('mouseleave', function(){
          element.css({
            border: 'none',
            color: 'black'
          });
        });
      });
    }
  }
})
}
