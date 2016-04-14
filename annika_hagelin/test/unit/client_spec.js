require('../../src');
var angular = require('angular');
require('angular-mocks');

describe('do tests', function() {

  var speciessCtrl;

  beforeEach(angular.mock.module('TreeApp'));
  beforeEach(angular.mock.inject(function($controller) {
    speciessCtrl = $controller('SpeciessController');
  }));

  it('do a test', function() {
    expect(false).toBe(false);
  });

  it('have a resource', function() {
    expect(speciessCtrl.resource).toEqual('speciess');
  });

  describe('REST tests', function() {

    var $httpBackend;
    var server = 'http://localhost:3000';


    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    it('get all species', function() {
      $httpBackend.expectGET(server+'/speciess')
        .respond(200, [{genus: 'plzus', species: 'responda', cmnName:'plz respond', _id:'1'}, {genus: 'hjalpus', species: 'miga', cmnName:'hjalp mig', _id:'2'}]);
      speciessCtrl.read();
      $httpBackend.flush();

      expect(speciessCtrl.speciess.length).toEqual(2);
      expect(speciessCtrl.speciess[0]).toEqual({genus: 'plzus', species: 'responda', cmnName:'plz respond', _id:'1'});
      expect(speciessCtrl.speciess.every(function(s) { return s._id; })).toBe(true);
    });

    it('create new speciess', function() {
      $httpBackend.expectPOST(server+'/speciess')
        .respond(200, {genus: 'tadius', species:'salemica', cmnName:'salem tad', _id:'3'});
      speciessCtrl.create({genus: 'tadius', species:'salemica', cmnName:'salem tad'});
      $httpBackend.flush();

      expect(speciessCtrl.speciess.length).toBe(1);
      expect(speciessCtrl.speciess[0].genus).toBe('tadius');
    });

    it('delete a speciess', function() {
      $httpBackend.expectDELETE(server+'/speciess/4')
        .respond(200);
      speciessCtrl.speciess.push({genus:'deletus', species:'miga', cmnName:'delete me', _id:'4'});
      speciessCtrl.delete({genus:'deletus', species:'miga', cmnName:'delete me', _id:'4'});
      $httpBackend.flush();

      expect(speciessCtrl.speciess.length).toBe(0);
    })

  });


});
