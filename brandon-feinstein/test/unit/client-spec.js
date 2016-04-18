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
      expect(userController.user.length).toBeGreaterThan(0);
      expect(userController.user[0].name).toBe('test user');
    });

    it('should create a new person', () => {
      $httpBackend.expectPOST('http://localhost:3000/users', {name: 'test person'})
        .respond(200, {name: 'test person', _id:'uniqueid'});
      userController.createUser({name: 'test person'})
      $httpBackend.flush();
      expect(userController.user.length).toBe(2);
      expect(userController.user[1].name).toBe('test person');
    });

    it('should delete a person', () => {
      $httpBackend.expectDELETE('http://localhost:3000/users/5')
        .respond(200, 'deleted');
      userController.user.push({name: 'test person', _id: 5});
      userController.removeUser({name: 'test person', _id: 5});
      $httpBackend.flush();
      expect(userController.user.length).toBe(1);
      expect(userController.user.every((u) => u._id != 5)).toBe(true);
    });

    // it('should update a person', () => {
    //   var updateUser = {name: 'test personup', _id: 5};
    //   $httpBackend.expectPUT('http://localhost:3000/users/5')
    //     .respond(200, 'updated');
    //   userController.user.push(updateUser);
    //   userController.updateUser(updateUser);
    //   // $httpBackend.flush();
    //   // expect(updateUser.editing).toBe(false);
    // });
  });
});
