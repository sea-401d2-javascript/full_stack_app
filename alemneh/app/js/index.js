require('angular');

const app = angular.module('IdeaApp', ['ngRoute']);

require('./auth_service')(app);
require('./route-config')(app);
require('./http_service')(app);
require('./nav-directive')(app);
require('./login-directive')(app);
require('./error_service')(app);
require('./signup-directive')(app);
require('./student-directive')(app);

app.run(['$rootScope', '$location', '$route', '$window', function($rootScope, $location, $route, $window) {

  $rootScope.$on('$locationChangeStart', function(event) {
    var nextRoute = $route.routes[$location.path()];
    if(nextRoute.requireLogin) {
      if(!JSON.parse($window.localStorage.token)) {
        event.preventDefault();
        $location.path('/signin');
      }
    }
  })
}]).controller('StudentController', [
  'AuthService','$http', '$location', 'EndpointService', 'ErrorService',
  function(AuthService, $http, $location, EndpointService, ErrorService) {

    const studentEndpoint = EndpointService('students');
    const signUpEndpoint = EndpointService('signup');
    const ideaEndpoint = EndpointService('students', 'ideas');
    const vm = this;
    vm.students = ['student'];
    vm.error = ErrorService();
    vm.loggedIn = false;
    vm.loggedOut = true;
    var oldIdea = {};
    var oldStudent = {};

    vm.go = function(path) {
      $location.path(path);
    };
    vm.setStudent = function (student) {
      oldStudent = {
        name: student.name,
        track: student.track
      };
    };
    vm.cancelStudent = function(student) {

      student.name = oldStudent.name;
      student.track = oldStudent.track;
    };
    vm.setIdea = function (idea) {
      oldIdea = {
        sector: idea.sector,
        lang: idea.lang,
        teamSize: idea.teamSize
      };
    };
    vm.cancelIdea = function(idea) {

      idea.sector = oldIdea.sector;
      idea.lang = oldIdea.lang;
      idea.teamSize = oldIdea.teamSize;
    };



    vm.getStudents = function() {
      studentEndpoint.summon(AuthService.getToken())
        .then((res) => {
          console.log(res.data);
          vm.students = res.data.data;
        }, function(error) {
          $location.path('/signin');
          console.error(error.data);
        });
    };
    vm.signUp = function(user) {
      AuthService.createUser(user, function(err, res) {
        if(err) return vm.error = ErrorService('Problem Creating User');
        vm.error = ErrorService(null);
        $location.path('/home');
        vm.loggedIn = true;
        vm.loggedOut = false;
      })
    }

    vm.signOut = function() {
      AuthService.signOut(() => {
        $location.path('/signin');
        vm.loggedIn = false;
        vm.loggedOut = true;
        console.log(vm.loggedIn);
      });
    }

    vm.signIn = function(user) {
      AuthService.signIn(user, (err, res) => {
        if(err) return vm.error = ErrorService('Problem Signing In');
        vm.error = ErrorService(null);
        $location.path('/home');
        vm.loggedIn = true;
        vm.loggedOut = false;
        console.log(vm.loggedIn);
      })
    }

    vm.removeStudent = function(student) {
      studentEndpoint.destroy(student, AuthService.getToken())
        .then((res) => {
          console.log(res);

          vm.students = vm.students.filter((s) => s._id != student._id);
        }, function(error) {
          console.log(error);
        });
    };
    vm.updateStudent = function(updateStudent) {
      console.log(updateStudent._id);
      studentEndpoint.update(updateStudent, AuthService.getToken())
        .then((res) => {
          console.log(res);
          updateStudent.editing = false;
        }, function(error) {
          console.log(error);
        });
    };
    vm.getStudentIdeas = function(student) {
      if(!student._id) {
        return;
      }

      if(typeof student == 'string' || student._id == 'undefined') {
        return;
      }
      ideaEndpoint.summonSub(student, AuthService.getToken())
        .then((res) => {
          student.showIdeas = false;
          student.addIdea = false;
          if(res.data.data.length > 0) {
            student.ideas = res.data.data;
          }
        }, function(error) {
          console.log(error);
        });
    };
    vm.createNewIdea = function(student, newIdea) {
      console.log(newIdea);
      ideaEndpoint.assembleSub(student, newIdea, AuthService.getToken())
        .then((res) => {
          console.log(res);
          student.ideas.push(newIdea);
        });
    };
    vm.removeIdea = function(student, idea) {
      console.log(student._id);
      ideaEndpoint.destroySub(student, idea, AuthService.getToken())
        .then((res) => {
          console.log(res);
          student.ideas = student.ideas.filter((s) => s._id != idea._id);
        }, function(error) {
          console.log(error);
        });
    };
    vm.updateIdea = function(student, idea) {
      ideaEndpoint.updateSub(student, idea, AuthService.getToken())
        .then((res) => {
          console.log(res);
          student.ideaEditing = false;
        }, function(error) {
          console.log(error);
        });
    };
  }]);
