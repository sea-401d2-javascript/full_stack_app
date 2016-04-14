(function(){

  let angular = require('angular');
  // require(__dirname + '/../build/beaut.css')
  require(__dirname + '/beers/beers_module.js')
  require(__dirname + '/beers/beers.js')
  require(__dirname + '/users/users_module.js')
  require(__dirname + '/users/users.js')

  angular.module('app',
   [
     'users'
     ,'beers'
     ]
   );

})();
