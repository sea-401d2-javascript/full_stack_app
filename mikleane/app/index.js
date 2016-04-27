(function(){

  let angular = require('angular');

  require(__dirname + '/beers/beers_module.js')
  require(__dirname + '/beers/beers.js')
  require(__dirname + '/users/users_module.js')
  require(__dirname + '/users/users.js')

  let app = angular.module('app',
   [
     'users'
     ,'beers'
     ]
   );

   require(__dirname + '/components/navbar_directive.js')(app);
   require(__dirname + '/components/highlight_directive.js')(app);
})();
