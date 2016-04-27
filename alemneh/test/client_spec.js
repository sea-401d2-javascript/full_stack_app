require('../app/js/index.js');
const angular = require('angular');
require('angular-mocks');


describe('it should test something', () => {
  var studentController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('IdeaApp'))
  beforeEach(angular.mock.inject(function($controller) {
    studentController = $controller('StudentController');
  }))
  it('should construct a controller', () => {
    expect(typeof studentController).toBe('object');
    expect(studentController.students[0]).toBe('student');
    expect(typeof studentController.getStudents).toBe('function')
  })
  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it('should get all students', () => {
      $httpBackend.expectGET('http://localhost:3000/students')
        .respond(200, {data: [{name: 'test person'}]});
      studentController.getStudents();
      $httpBackend.flush();
      expect(studentController.students.length).toBeGreaterThan(0);
      expect(studentController.students[0].name).toBe('test person');
    })
    it('should create a new student', () => {
      $httpBackend.expectPOST('http://localhost:3000/signup', {name: 'test person'})
        .respond(200, {name: 'test person', track: 'Java', password:'password', _id:'uniqueId'});
      studentController.createStudent({name:'test person'});
      $httpBackend.flush();
      expect(studentController.students.length).toBe(2);
      expect(studentController.students[1].name).toBe('test person');
      expect(studentController.newStudent).toBeNull();
    })
    it('should delete a student', () => {
      $httpBackend.expectDELETE('http://localhost:3000/students/5')
        .respond(200, 'deleted');
      studentController.students.push({name: 'test person', _id: 5});
      studentController.removeStudent({name: 'test person', _id: 5});
      $httpBackend.flush();
      expect(studentController.students.length).toBe(1);
      expect(studentController.students.every((s) => s._id != 5)).toBe(true);
    })
    it('should update a student', () => {
      var updateStudent = {name: 'test person', _id: 5};
      $httpBackend.expectPUT('http://localhost:3000/students/5')
        .respond(200, 'updated');
      studentController.students.push(updateStudent);
      studentController.updateStudent(updateStudent);
      $httpBackend.flush();
      expect(updateStudent.editing).toBe(false);
    })
    it('should create idea for a student', () => {
      var student = {name:'test student', _id: 5, ideas:[]};
      $httpBackend.expectPOST('http://localhost:3000/students/5/ideas', {sector: 'sports'})
        .respond(200, {data: [{sector: 'sports'}]});
      studentController.createNewIdea(student, {sector: 'sports'});
      $httpBackend.flush();
      expect(student.ideas.length).toBe(1);
      expect(student.ideas[0].sector).toBe('sports');
    })
    it('should get idea for a student', () => {
      var student = {name:'test student', _id: 5, ideas:[]};
      $httpBackend.expectGET('http://localhost:3000/students/5/ideas')
        .respond(200, {data: [{sector: 'sports'}]});
      studentController.getStudentIdeas(student);
      $httpBackend.flush();
      expect(student.ideas.length).toBeGreaterThan(0);
      expect(student.ideas[0].sector).toBe('sports')
    })
    it('should update idea', () => {
      var student = {name:'test student', _id: 5, ideas:[]};
      var idea = {sector:'sports', _id: 6};
      $httpBackend.expectPUT('http://localhost:3000/students/5/ideas/6', idea)
        .respond(200, 'updated');
      studentController.updateIdea(student, idea);
      $httpBackend.flush();
      expect(student.ideaEditing).toEqual(false);
    })
    it('should delete an idea of a student', () => {
      var student = {name:'test student', _id: 5, ideas:[{sector:'sports'}]};
      var idea = {sector:'sports', _id: 6};
      $httpBackend.expectDELETE('http://localhost:3000/students/5/ideas/6')
        .respond(200, 'deleted')
      // student.ideas.push({})
      studentController.removeIdea(student, idea);
      $httpBackend.flush();
      expect(student.ideas.length).toBe(1);
      expect(student.ideas.every((i) => i._id != 5)).toBe(true);

    })
  })

});
