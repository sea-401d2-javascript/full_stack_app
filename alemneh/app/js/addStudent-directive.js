module.exports = function(app) {

  app.directive('addStudent', function() {
    return {
      return: 'E',
      templateUrl: './views/add-student.html'
    };
  });

}
