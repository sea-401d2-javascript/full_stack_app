require('../js/index.js');
let angular = require('angular');
require('angular-mocks');

describe('it should test something', ()=> {
  var beerController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });
  beforeEach(angular.mock.module('app'));
  beforeEach(angular.mock.inject(function($controller){
    beerController = $controller('BeersController')
  }))
  it('should construct a controller', () => {
    expect(typeof beerController).toBe('object');
    expect(beerController.beers[0]).toBe('beer');
    expect(typeof beerController.getBeers).toBe('function');
  });

  describe('Beers REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;
    }));
    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    })
    it('should get all beers', () => {
      $httpBackend.expectGET('http://localhost:3000/beers')
        .respond(200, {beers:[{name: 'test beer'}]})
      beerController.getBeers();
      $httpBackend.flush();
      expect(beerController.beers.length).toBe(1);
      expect(beerController.beers[0].name).toBe('test beer');
    })
    it('should create a new beer', () => {
      $httpBackend.expectPOST('http://localhost:3000/beers')
        .respond(200, {name: 'test beer', type: 'ale'})
        beerController.createBeer({name: 'test beer'})
        $httpBackend.flush();
        expect(beerController.beers.length).toBeGreaterThan(0);
        expect(beerController.beers[1].name).toBe('test beer');
        // expect(beerController.newBeer).toBeNull();
    })
    it('should update a beer record', () => {
      $httpBackend.expectPUT('http://localhost:3000/beers/3')
        .respond(200, 'updated');
        beerController.beers.push({name: 'test beer', _id: 3})
        beerController.updateBeer({name: 'updated beer', _id: 3})
        $httpBackend.flush();
        expect(beerController.beers.length).toBe(2);
        expect(beerController.beers.every((b) => b._id=3)).toBe(true);
        // expect(beerController.beers[1].name).toBe('updated beer');
    })
    it('should delete a beer', () => {
      $httpBackend.expectDELETE('http://localhost:3000/beers/5')
        .respond(200, 'deleted');
        beerController.beers.push({name: 'test beer', _id: 5})
        beerController.removeBeer({name: 'test beer', _id: 5});
        $httpBackend.flush();
        expect(beerController.beers.length).toBe(1);
        expect(beerController.beers.every((b) => b._id != 5)).toBe(true);
        
    })
  })
})
