require(__dirname + '/../../app/index.js');
const angular = require('angular');
require('angular-mocks');

describe('it should test something', () => {
  var ChefController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });

  beforeEach(angular.mock.module('ChefApp'));
  beforeEach(angular.mock.inject(function($controller) {
    ChefController = $controller('ChefController');
  }));

  it('should construct a controller', ()=> {
    expect(typeof ChefController).toBe('object');
    expect(typeof ChefController.createChef).toBe('function');
  });
  describe('REST tests', ()=> {
    var $httpBackend;

    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
    }));

    afterEach(()=> {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all chefs', ()=> {
      $httpBackend.expectGET('http://localhost:3000/chefs')
        .respond(200, {data: [{name: 'test chef'}]});
      ChefController.getChefs();
      $httpBackend.flush();
      expect(ChefController.chefs.length).toBe(1);
      expect(ChefController.chefs[0].name).toBe('test chef');
    });

    it('should create a new person', ()=> {
      $httpBackend.expectPOST('http://localhost:3000/chefs', {name: 'test chef name'})
        .respond(200, {name: 'test chef name', funFact: 'loves cooking', _id:'uniqueid'});
      ChefController.createChef({name: 'test chef name'});
      $httpBackend.flush();
      expect(ChefController.chefs.length).toBeGreaterThan(0);
      expect(ChefController.chefs[1].name).toBe('test chef name');
      // expect(ChefController.newChef).toBe('object');
    });

    it('should update a chef', ()=> {
      $httpBackend.expectPUT('http://localhost:3000/chefs/2')
        .respond(200, {data: [{name: 'test chef', funFact: 'loves cooking', _id: 2}]});
      ChefController.chefs.push({name: 'test chef', funFact: 'loves cooking', _id: 2});
      ChefController.updateChef({name: 'updated chef', funFact: 'really loves cooking', _id: 2});
      $httpBackend.flush();
      expect(ChefController.chefs.length).toBe(2);
      expect(ChefController.chefs.every((c) => c._id = 2)).toBe(true);
      // expect(ChefController.chefs[1].name).toBe('updated chef');
    });

    it('should delete a chef', ()=> {
      $httpBackend.expectDELETE('http://localhost:3000/chefs/3')
        .respond(200);
      ChefController.chefs.push({name: 'test chef', _id: 3});
      ChefController.removeChef({name: 'test chef', _id:3});
      $httpBackend.flush();
      expect(ChefController.chefs.length).toBe(1);
      expect(ChefController.chefs.every((c)=> c._id != 3)).toBe(true);
    });
  });
});
