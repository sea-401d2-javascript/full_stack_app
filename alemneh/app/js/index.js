require('angular');

const app = angular.module('IdeaApp', []);
app.controller('StudentController', ['$scope','$http', function($scope, $http) {
  const route = 'http://localhost:3000';
  $scope.students = [];
  var oldIdea = {};
  var oldStudent = {}
  $scope.setStudent = function (student) {
    oldStudent = {
      name: student.name,
      track: student.track
    };
  }
  $scope.cancelStudent = function(student) {

    student.name = oldStudent.name;
    student.track = oldStudent.track;
  }
  $scope.setIdea = function (idea) {
    oldIdea = {
      sector: idea.sector,
      lang: idea.lang,
      teamSize: idea.teamSize
    };
  }
  $scope.cancelIdea = function(idea) {

    idea.sector = oldIdea.sector;
    idea.lang = oldIdea.lang;
    idea.teamSize = oldIdea.teamSize;
  }

  $scope.getStudents = function() {
    $http.get(route+'/students')
      .then((res) => {
        console.log(res.data.data);

        $scope.students = res.data.data;
      }, function(error) {
        console.error(error);
      })
  }
  $scope.createStudent = function(newStudent) {
    $http.post(route+'/signup', newStudent)
      .then((res) => {
        console.log(res);

        $scope.students.push(newStudent);
        $scope.newStudent = {};
      }, function(error) {
        console.log(error);
      })
  }
  $scope.removeStudent = function(student) {
    $http.delete(route+'/'+student._id)
      .then((res) => {
        console.log(res);

        $scope.students = $scope.students.filter((s) => s._id != student._id);
      }, function(error) {
        console.log(error);
      })
  }
  $scope.updateStudent = function(student) {
    console.log(student._id);
    $http.put(route + '/' + student._id, student)
      .then((res) => {
        console.log(res);
        $scope.editing = false;
      }, function(error) {
        console.log(error);
      })
  }
  $scope.getStudentIdeas = function(student) {
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
  $scope.createNewIdea = function(student, newIdea) {
    $http.post(route+ '/' + student._id + '/ideas', newIdea)
      .then((res) => {
        console.log(res)
        student.ideas.push(newIdea);
      })
  }
  $scope.removeIdea = function(student, idea) {
    $http.delete(route + '/' + student._id + '/ideas/' + idea._id)
      .then((res) => {
        console.log(res);
        student.ideas = student.ideas.filter((s) => s._id != idea._id);
      }, function(error) {
        console.log(error);
      })
  }
  $scope.updateIdea = function(student, idea) {
    $http.put(route + '/' + student._id + '/ideas/' + idea._id, idea)
      .then((res) => {
        console.log(res);
        student.ideaEditing = false;
      }, function(error) {
        console.log(error);
      })
  }
}])
