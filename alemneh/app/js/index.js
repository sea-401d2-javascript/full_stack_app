require('angular');

const app = angular.module('IdeaApp', []);
app.controller('StudentController', ['$http', function($http) {
  const route = 'http://localhost:3000';
  const vm = this;
  vm.students = ['student'];
  var oldIdea = {};
  var oldStudent = {}
  vm.setStudent = function (student) {
    oldStudent = {
      name: student.name,
      track: student.track
    };
  }
  vm.cancelStudent = function(student) {

    student.name = oldStudent.name;
    student.track = oldStudent.track;
  }
  vm.setIdea = function (idea) {
    oldIdea = {
      sector: idea.sector,
      lang: idea.lang,
      teamSize: idea.teamSize
    };
  }
  vm.cancelIdea = function(idea) {

    idea.sector = oldIdea.sector;
    idea.lang = oldIdea.lang;
    idea.teamSize = oldIdea.teamSize;
  }

  vm.getStudents = function() {
    $http.get(route+'/students')
      .then((res) => {
        console.log(res.data.data);

        vm.students = res.data.data;
      }, function(error) {
        console.error(error);
      })
  }
  vm.createStudent = function(newStudent) {
    $http.post(route+'/signup', newStudent)
      .then((res) => {
        console.log(res);

        vm.students.push(newStudent);
        vm.newStudent = null;
      }, function(error) {
        console.log(error);
      })
  }
  vm.removeStudent = function(student) {
    $http.delete(route+'/'+student._id)
      .then((res) => {
        console.log(res);

        vm.students = vm.students.filter((s) => s._id != student._id);
      }, function(error) {
        console.log(error);
      })
  }
  vm.updateStudent = function(updateStudent) {
    console.log(updateStudent._id);
    $http.put(route + '/' + updateStudent._id, updateStudent)
      .then((res) => {
        console.log(res);
        updateStudent.editing = false;
      }, function(error) {
        console.log(error);
      })
  }
  vm.getStudentIdeas = function(student) {
    $http.get(route + '/' + student._id + '/ideas')
      .then((res) => {
        student.showIdeas = false;
        student.addIdea = false;
        if(res.data.data.length > 0) {
          student.ideas = res.data.data;
        }
      }, function(error) {
        console.log(error);
      })
  }
  vm.createNewIdea = function(student, newIdea) {
    $http.post(route+ '/' + student._id + '/ideas', newIdea)
      .then((res) => {
        console.log(res)
        student.ideas.push(newIdea);
      })
  }
  vm.removeIdea = function(student, idea) {
    console.log(student._id);
    $http.delete(route + '/' + student._id + '/ideas/' + idea._id)
      .then((res) => {
        console.log(res);
        student.ideas = student.ideas.filter((s) => s._id != idea._id);
      }, function(error) {
        console.log(error);
      })
  }
  vm.updateIdea = function(student, idea) {
    $http.put(route + '/' + student._id + '/ideas/' + idea._id, idea)
      .then((res) => {
        console.log(res);
        student.ideaEditing = false;
      }, function(error) {
        console.log(error);
      })
  }
}])
