(function(){

  let angular = require('angular');
  require('angular-route');

  require(__dirname + '/beers/beers_module.js')
  require(__dirname + '/beers/beers.js')
  require(__dirname + '/users/users_module.js')
  require(__dirname + '/users/users.js')

  let app = angular.module('app',
   [
     'users'
     ,'beers'
     ,'ngRoute'
     ]
   );

   require(__dirname + '/components/navbar_directive.js')(app);
   require(__dirname + '/components/highlight_directive.js')(app);

   app.config(['$routeProvider', function(router){
       router
       .when('/signup', {
         controller: 'UsersController',
         controllerAs: 'usersctrl',
         templateUrl: 'signup-signin.html'
       })
       .when('/home', {
         controller: 'BeersController',
         controllerAs: 'beersctrl',
         templateUrl:  'home.html'
       })
     }])

})();
