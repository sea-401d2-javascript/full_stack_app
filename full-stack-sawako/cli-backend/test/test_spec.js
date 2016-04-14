//this is unit testing. Need DevDependencies "karma-chrome-launcher", "karma","jasmine"
//run --$  karma start
require('../app/index.js');
const angular = require('angular');
require('angular-mocks');

describe('it should test controllers for all the routes', function (){
  var continentCtrl;
  beforeEach(function (){
    angular.mock.module('myApp');
  });
  beforeEach(function (){
    angular.mock.inject(function($controller){
      continentCtrl = $controller('ContinentCtrl');
    });
  });
  it('should construct a controller', function (){
    expect(typeof continentCtrl).toBe('object');
    expect(continentCtrl.newConts).toEqual({
      "country": "",
      "region": "",
      "mineral": ""
    });
    expect(typeof continentCtrl.cancelEdits).toBe('function');
  });
  describe('Testing REST rotues', function(){
    var $httpBackend;
      beforeEach(function(){
        angular.mock.inject(function(_$httpBackend_){
          $httpBackend = _$httpBackend_;
        });
      });
      afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should get all continents data', function(){
        $httpBackend.expectGET('http://localhost:3000/continents')
          .respond(200, [{_id: 12345}])
        continentCtrl.getContinents();
        $httpBackend.flush();
        expect(continentCtrl.continentsList.length).toBe(1);
        expect(continentCtrl.allContinents.length).toBe(1);
        expect(continentCtrl.continentsList[0]._id).toBe(12345);
      });

      it('should get one specific continent by id', function(){
        $httpBackend.expectGET('http://localhost:3000/continents/12345')
        .respond(200, {_id: 12345, country: 'Brazil'})
        continentCtrl.id = '12345';
        continentCtrl.getByIdContinents();
        $httpBackend.flush();
        expect(continentCtrl.buttonShow).toBe(true);
        expect(typeof continentCtrl.getCont).toBe('object');
        expect(continentCtrl.getCont.country).toBe('Brazil');
      });
  });
});
