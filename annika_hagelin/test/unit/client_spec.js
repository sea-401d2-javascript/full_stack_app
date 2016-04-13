require('../../src');
var angular = require('angular');
require('angular-mocks');

describe('do tests', function() {

  var speciessCtrl;

  beforeEach(angular.mock.module('TreeApp'));
  beforeEach(angular.mock.inject(function($controller) {
    speciessCtrl = $controller('SpeciessController');
  }))

  it('do a test', function() {
    expect(false).toBe(false);
  });

  it('have a resource', function() {
    expect(speciessCtrl.resource).toEqual('speciess');
  });

  describe('REST tests', function() {
    var $httpBackend;


    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    it('get all species', function() {
      $httpBackend.expectGET('http://localhost:3000/speciess')
        .respond(200, [{genus: 'plzus', species: 'responda', cmnName:'plz respond'}]);

      speciessCtrl.read();
      $httpBackend.flush();

      expect(speciessCtrl.speciess.length).toEqual(1);
    })

  });


});
