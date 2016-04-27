require('../js/index.js');
require('angular');
require('angular-mocks');

describe('it should test something', ()=> {
  var userController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller){
    userController = $controller('UsersController')
  }))
  it('should construct a controller', () => {
    expect(typeof userController).toBe('object');
    expect(userController.users[0]).toBe('user');
    expect(typeof userController.getUsers).toBe('function');
  });

  describe('Users REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it('should get all users', () => {
      $httpBackend.expectGET('http://localhost:3000/users')
        .respond(200, {users:[{firstName: 'test Sally'}]})
      userController.getUsers();
      $httpBackend.flush();
      expect(userController.users.length).toBe(1);
      expect(userController.users[0].firstName).toBe('test Sally');
    })
    it('should create a new user', () => {
      $httpBackend.expectPOST('http://localhost:3000/users')
        .respond(200, {firstName: 'test Jane', lastName: 'Doe'})
        userController.createUser({firstName: 'test Jane', lastName: 'Doe'})
        $httpBackend.flush();
        expect(userController.users.length).toBeGreaterThan(0);
        expect(userController.users[1].firstName).toBe('test Jane');
        expect(userController.users[1].lastName).toBe('Doe');

    })
    it('should update a user record', () => {
      $httpBackend.expectPUT('http://localhost:3000/users/7')
        .respond(200, 'updated');
        userController.users.push({firstName: 'test Cathy', _id: 7})
        userController.updateUser({firstName: 'new Cathy', _id: 7})
        $httpBackend.flush();
        expect(userController.users.length).toBe(3);
        expect(userController.users.every((b) => b._id=7)).toBe(true);

    })
    it('should delete a user', () => {
      $httpBackend.expectDELETE('http://localhost:3000/users/5')
        .respond(200, 'deleted');
        userController.users.push({firstName: 'test Sam', _id: 5})
        userController.removeUser({firstName: 'test Sam', _id: 5});
        $httpBackend.flush();
        expect(userController.users.length).toBe(1);
        expect(userController.users.every((u) => u._id != 5)).toBe(true);

    })
  })
})
