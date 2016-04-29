(function() {
'use strict';

var app = angular.module('users');

require(__dirname + '/../services/http_service')(app);
require(__dirname + '/../services/auth_service')(app);
require(__dirname + '/../services/error_service')(app);

app.controller('UsersController', ['$http', 'ResourceService', 'AuthService', '$location', 'ErrorService', function($http, ResourceService, AuthService, $location, ErrorService) {
      var vm = this;
      const usersResource = ResourceService('users');

        vm.users = {};
        vm.users = ['user'];
        vm.getUsers = function() {
          usersResource.getAll()
          .then((result) => {
            vm.users = result.data.users;
          }), function(error) {
          };
        };

        vm.createUser = function(user) {
          usersResource.create(user)
          .then((res) => {
            vm.users.push(res.data);
            vm.newUser = {};
          })
        }

        vm.updateUser = function(user) {
          usersResource.update(user)
          .then((res) => {
          })
          .catch((err) => {
            console.log(err);
        });
        vm.updateUser.displayed = null;

      };

        vm.resetUser = function(user) {
          usersResource.reset(user)
            .then((res) => {
              vm.users[vm.users.indexOf(user)] = res.data
            })
            .catch((err) => {
              console.log(err)
        });
        vm.resetUser.displayed = null;
      };

        vm.removeUser = function(user) {
          usersResource.remove(user)
          .then((res) => {
            vm.users = vm.users.filter((u) => u._id != user._id)
          })
        }
        vm.signUp = function(user) {
        AuthService.createUser(user, function(err, res){
          if (err) return vm.error = ErrorService('Problem Creating User');
          vm.error = ErrorService(null);
          $location.path('/home');
          });
        }
        vm.signOut = function() {
          AuthService.signOut(() => {
            $location.path('/signup');
          });
        }
        vm.signIn = function(user) {
          AuthService.signIn(user, (err,res) => {
            if (err) return vm.error = ErrorService('Problem Signing In');
            vm.error = ErrorService(null);
            $location.path('/home');
          })
        }


      }]);





})()
