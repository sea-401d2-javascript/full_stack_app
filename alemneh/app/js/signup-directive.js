module.exports = function(app) {

  app.directive('signUp', function() {
    return {
      return: 'E',
      templateUrl: './views/add-student.html'
    };
  });

}
