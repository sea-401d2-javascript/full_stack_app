'use strict';
require('../app/js/index');
const angular = require('angular');
require('angular-mocks');

describe('http tests', function() {
  var EndpointService;
  beforeEach(angular.mock.module('IdeaApp'));
  beforeEach(angular.mock.inject(function(_EndpointService_) {
    EndpointService = _EndpointService_;
  }));

  it('should be a service', function() {
    expect(typeof EndpointService).toBe('function');
  });

  it('should return a endpoint object', function() {
    var testEndpoint = EndpointService('test');
    expect(typeof testEndpoint).toBe('object');
    expect(testEndpoint.endpointName).toBe('test');
  });
});
