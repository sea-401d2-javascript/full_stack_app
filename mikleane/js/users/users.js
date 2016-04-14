(function() {
  angular.module('users')
    .controller('UsersController', ['$http', function($http) {
      let userRoute = 'http://localhost:3000/users';
        this.users = {};
        this.users = ['user'];
        this.getUsers = function() {
          $http.get(userRoute)
          .then((result) => {
            this.users = result.data.users;
          }), function(error) {
          };
        };

        this.createUser = function(user) {
          console.log('user ', user)
          $http.post(userRoute, user)
          .then((res) => {
            this.users.push(res.data);
            this.newUser = {};
          })
        }

        this.updateUser = function(user) {
          $http.put(userRoute + '/' + user._id, user)
          .then((res) => {
            console.log(res.data)
            this.users.push(res.data)
          })
          .catch((err) => {
            console.log(err);
        });
        this.updateUser.displayed = null;

      };

        this.resetUser = function(user) {
          $http.get(userRoute +'/'+ user._id)
            .then((res) => {
              this.users[this.users.indexOf(user)] = res.data
            })
            .catch((err) => {
              console.log(err)
        });
      };

        this.removeUser = function(user) {
          $http.delete(userRoute + '/' + user._id)
          .then((res) => {
            this.users = this.users.filter((u) => u._id != user._id)
          })
        }
      }]);
})()
