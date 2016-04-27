(function() {
'use strict';

var app = angular.module('users');

require(__dirname + '/../services/http_service')(app);

app.controller('UsersController', ['$http', 'ResourceService', function($http, ResourceService) {
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
      }]);
})()
