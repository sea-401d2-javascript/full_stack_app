'use strict';

require('../src/app.js');
const angular = require('angular');
require('angular-mocks');

describe('Unit tests for fullstack application: bars', () => {
  var barController;
  beforeEach(angular.mock.module('RESTApp'));
  beforeEach(angular.mock.inject(function($controller) {
    barController = $controller('BarController');
  }));
  it('should construct a controller', () => {
    expect(typeof barController).toBe('object');
    expect(typeof barController.bars[0]).toBe('object');
    expect(typeof barController.getBars).toBe('function');
  });
  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    it('should get all bars', () => {
      $httpBackend.expectGET('http://localhost:3000/bars')
        .respond(200, {bars: [{name: 'test bar'}]});
      barController.getBars();
      $httpBackend.flush();
      expect(barController.bars.length).toBe(1);
      expect(barController.bars[0].name).toBe('Create a new bar!');
    });
    it('should create a bar', () => {
      $httpBackend.expectPOST('http://localhost:3000/bars', {name: 'test bar'})
        .respond(200, {name: 'test bar'});
      barController.createBar({name: 'test bar'});
      console.log(barController.bars);
      expect(barController.bars.length).toBeGreaterThan(0);
      expect(barController.bars[0].name).toBe('Create a new bar!');
    });
    it('should delete a bar', () => {
      $httpBackend.expectDELETE('http://localhost:3000/bars/5')
        .respond(200, {msg: 'bar removed'});
      barController.bars.push({name: 'test bar', _id: 5});
      barController.deleteBar({name: 'test bar', _id: 5});
      $httpBackend.flush();
      expect(barController.bars.length).toBe(1);
      expect(barController.bars.every((p) => p._id != 5)).toBe(true);
    });
    it('should update a bar', () => {
      $httpBackend.expectPUT('http://localhost:3000/bars/6')
        .respond(200, {msg: 'success'});
      barController.bars.push({name: 'test bar', _id: 6});
      barController.updateBar({name: 'updated bar', _id: 6});
      $httpBackend.flush();
      expect(barController.bars.length).toBe(2);
      expect(barController.bars[1].name).toBe('test bar');
    });
  });
});

describe('Unit tests for fullstack application: bands', () => {
  var bandController;
  beforeEach(angular.mock.module('RESTApp'));
  beforeEach(angular.mock.inject(function($controller) {
    bandController = $controller('BandController');
  }));
  it('should construct a controller', () => {
    expect(typeof bandController).toBe('object');
    expect(typeof bandController.bands[0]).toBe('object');
    expect(typeof bandController.getBands).toBe('function');
  });
  describe('REST tests', () => {
    var $httpBackend;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));
    it('should get all bands', () => {
      $httpBackend.expectGET('http://localhost:3000/bands')
        .respond(200, {bands: [{name: 'test band'}]});
      bandController.getBands();
      $httpBackend.flush();
      expect(bandController.bands.length).toBe(1);
      expect(bandController.bands[0].name).toBe('Create a new band!');
    });
    it('should create a band', () => {
      $httpBackend.expectPOST('http://localhost:3000/bands', {name: 'test band'})
        .respond(200, {name: 'test band'});
      bandController.createBand({name: 'test band'});
      console.log(bandController.bands);
      expect(bandController.bands.length).toBeGreaterThan(0);
      expect(bandController.bands[0].name).toBe('Create a new band!');
    });
    it('should delete a band', () => {
      $httpBackend.expectDELETE('http://localhost:3000/bands/5')
        .respond(200, {msg: 'band removed'});
      bandController.bands.push({name: 'test band', _id: 5});
      bandController.deleteBand({name: 'test band', _id: 5});
      $httpBackend.flush();
      expect(bandController.bands.length).toBe(1);
      expect(bandController.bands.every((p) => p._id != 5)).toBe(true);
    });
    it('should update a band', () => {
      $httpBackend.expectPUT('http://localhost:3000/bands/6')
        .respond(200, {msg: 'success'});
      bandController.bands.push({name: 'test band', _id: 6});
      bandController.updateBand({name: 'updated band', _id: 6});
      $httpBackend.flush();
      expect(bandController.bands.length).toBe(2);
      expect(bandController.bands[1].name).toBe('test band');
    });
  });
});

