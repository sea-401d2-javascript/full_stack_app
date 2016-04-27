module.exports = function(app) {

  app.directive('student', function() {
    return {
      return: 'E',
      templateUrl: './views/student-view.html'
    };
  });

}
