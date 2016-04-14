//this is unit testing. Need DevDependencies "karma-chrome-launcher", "karma","jasmine"
//run --$  karma start
require('../app/index.js');
const angular = require('angular');
require('angular-mocks');

describe('it should test somthing', function (){
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
  });

});
