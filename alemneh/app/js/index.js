require('angular');

const app = angular.module('IdeaApp', []);

require('./http_service')(app);
require('./addStudent-directive')(app);
require('./student-directive')(app);
app.controller('StudentController', ['$http', 'EndpointService',
  function($http, EndpointService) {

  const route = 'http://localhost:3000';
  const studentEndpoint = EndpointService('students');
  const signUpEndpoint = EndpointService('signup');
  const ideaEndpoint = EndpointService('students', 'ideas');
  const vm = this;
  vm.students = ['student'];
  var oldIdea = {};
  var oldStudent = {};
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
    studentEndpoint.summon()
      .then((res) => {
        console.log(res.data.data);

        vm.students = res.data.data;
      }, function(error) {
        console.error(error);
      });
  };
  vm.createStudent = function(newStudent) {
    signUpEndpoint.assemble(newStudent)
      .then((res) => {
        console.log(res);

        vm.students.push(newStudent);
        vm.newStudent = null;
      }, function(error) {
        console.log(error);
      });
  };
  vm.removeStudent = function(student) {
    studentEndpoint.destroy(student)
      .then((res) => {
        console.log(res);

        vm.students = vm.students.filter((s) => s._id != student._id);
      }, function(error) {
        console.log(error);
      });
  };
  vm.updateStudent = function(updateStudent) {
    console.log(updateStudent._id);
    studentEndpoint.update(updateStudent)
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
    ideaEndpoint.summonSub(student)
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
    ideaEndpoint.assembleSub(student, newIdea)
      .then((res) => {
        console.log(res);
        student.ideas.push(newIdea);
      });
  };
  vm.removeIdea = function(student, idea) {
    console.log(student._id);
    ideaEndpoint.destroySub(student, idea)
      .then((res) => {
        console.log(res);
        student.ideas = student.ideas.filter((s) => s._id != idea._id);
      }, function(error) {
        console.log(error);
      });
  };
  vm.updateIdea = function(student, idea) {
    ideaEndpoint.updateSub(student, idea)
      .then((res) => {
        console.log(res);
        student.ideaEditing = false;
      }, function(error) {
        console.log(error);
      });
  };
}]);

// app.directive('student', function() {
//   return {
//     return: 'E',
//     templateUrl: './views/student-view.html'
//   };
// });
//
// app.directive('addStudent', function() {
//   return {
//     return: 'E',
//     templateUrl: './views/add-student.html'
//   };
// });
