module.exports = function(app) {

  app.factory('ErrorService', function() {
    var error;
    return function(newError) {
      if (newError === undefined) return error;
      return error = newError;
    }
  });

}
