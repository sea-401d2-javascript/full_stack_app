require(__dirname + '/../../app/index.js');
const angular = require('angular');
require('angular-mocks');


describe('it should test something', () => {
  var userController;
  it('should have a test', () => {
    expect(true).toBe(true);
  });
  beforeEach(angular.mock.module('UserApp'))
  beforeEach(angular.mock.inject(function($controller) {
    userController = $controller('UserController');
  }))
  it('should construct a controller', () => {
    expect(typeof userController).toBe('object');
    expect(typeof userController.getUser).toBe('function');
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

    it('should get all users', () => {
      $httpBackend.expectGET('http://localhost:3000/users')
        .respond(200, {data: [{name: 'test user'}]});
      userController.getUser();
      $httpBackend.flush();
      // console.log(userController.user);
      expect(userController.user.length).toBeGreaterThan(0);
      expect(userController.user[0].name).toBe('test user');
    });

    // it('should create a new person', () => {
    //   $httpBackend.expectPOST('http://localhost:3000/people', {name: 'test person'})
    //     .respond(200, {name: 'test person', age: 18, _id:'uniqueid'});
    //   peopleController.createPerson({name: 'test person'})
    //   $httpBackend.flush();
    //   expect(peopleController.people.length).toBe(2);
    //   expect(peopleController.people[1].name).toBe('test person');
    //   expect(peopleController.newPerson).toBeNull();
    // });
    //
    // it('should delete a person', () => {
    //   $httpBackend.expectDELETE('http://localhost:3000/people/5')
    //     .respond(200, 'deleted');
    //   peopleController.people.push({name: 'test person', _id: 5});
    //   peopleController.removePerson({name: 'test person', _id: 5});
    //   $httpBackend.flush();
    //   expect(peopleController.people.length).toBe(1);
    //   expect(peopleController.people.every((p) => p._id != 5)).toBe(true);
    // });
    //
    // it('should update a person', () => {
    //   var updatePerson = {name: 'test person', _id: 5};
    //   $httpBackend.expectPUT('http://localhost:3000/people/5')
    //     .respond(200, 'updated');
    //   peopleController.people.push(updatePerson);
    //   peopleController.updatePerson(updatePerson);
    //   $httpBackend.flush();
    //   expect(updatePerson.editing).toBe(false);
    // });
  });
});
