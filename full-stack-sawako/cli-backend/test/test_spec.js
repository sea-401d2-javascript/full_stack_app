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

      it('should create one continent', function(){
        $httpBackend.expectPOST('http://localhost:3000/continents', {country: 'Brazil!!'})
          .respond(200, {_id: 12345, country: 'Brazil!!'})
        continentCtrl.newConts = {
          country: 'Brazil!!'
        }
        continentCtrl.createContinents();
        $httpBackend.flush();
        expect(continentCtrl.continents.length).toBe(1);
        expect(continentCtrl.continents[0].country).toBe('Brazil!!');
      });

      it('should edit a continent by id', function(){
        $httpBackend.expectPUT('http://localhost:3000/continents/12345')
          .respond(200, {updated: 'updated'})
        continentCtrl.id = '12345';
        continentCtrl.getCont = {
          country: 'Japan',
          _id: '12345'
        }
        continentCtrl.editContinents()
        $httpBackend.flush()
        expect(typeof continentCtrl.getCont).toBe('object');
        expect(continentCtrl.getCont.updated).toBe('updated');
      });

      it('should delete a continent by id', function(){
        $httpBackend.expectDELETE('http://localhost:3000/continents/12345')
          .respond(200, {msg: 'deleted'})
        continentCtrl.id = '12345';
        continentCtrl.allContinents = [
          {
            country: 'Japan', _id: '12345'
          },
          {
            country: 'Korea', _id: '12346'
          }
        ]
        continentCtrl.removeContFromArr();
        continentCtrl.deleteContinentById();
        $httpBackend.flush();
        expect(continentCtrl.getCont.msg).toBe('deleted')
        expect(continentCtrl.allContinents.length).toBe(1)
        expect(continentCtrl.allContinents[0].country).toBe('Korea')
      });
  });
});

describe('it should test controllers for all the routes', function (){
  var gemCtrl;
  beforeEach(function (){
    angular.mock.module('myApp');
  });
  beforeEach(function (){
    angular.mock.inject(function($controller){
      gemCtrl = $controller('gemsController');
    });
  });
  it('should construct a controller', function (){
    expect(typeof gemCtrl).toBe('object');
    expect(gemCtrl.newGem).toEqual({
      name: '',
      color: '',
      density: ''
    });
    expect(typeof gemCtrl.cancelEdits).toBe('function');
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

      it('should get all gems data', function(){
        $httpBackend.expectGET('http://localhost:3000/gems')
          .respond(200, [{_id: 12345}])
        gemCtrl.getGems();
        $httpBackend.flush();
        expect(gemCtrl.gemsList.length).toBe(1);
        expect(gemCtrl.allGems.length).toBe(1);
        expect(gemCtrl.gemsList[0]._id).toBe(12345);
      });

      it('should get one specific gem by id', function(){
        $httpBackend.expectGET('http://localhost:3000/gems/12345')
        .respond(200, {_id: 12345, name: 'ruby'})
        gemCtrl.id = '12345';
        gemCtrl.getGemById();
        $httpBackend.flush();
        expect(gemCtrl.buttonShow).toBe(true);
        expect(typeof gemCtrl.getGem).toBe('object');
        expect(gemCtrl.getGem.name).toBe('ruby');
      });

      it('should create one gem', function(){
        $httpBackend.expectPOST('http://localhost:3000/gems', {name: 'ruby!!'})
          .respond(200, {_id: 12345, name: 'ruby!!'})
        gemCtrl.newGem = {
          name: 'ruby!!'
        }
        gemCtrl.createGems();
        $httpBackend.flush();
        expect(gemCtrl.gems.length).toBe(1);
        expect(gemCtrl.gems[0].name).toBe('ruby!!');
      });

      it('should edit a gem by id', function(){
        $httpBackend.expectPUT('http://localhost:3000/gems/12345')
          .respond(200, {updated: 'updated'})
        gemCtrl.id = '12345';
        gemCtrl.getGem = {
          name: 'Japan',
          _id: '12345'
        }
        gemCtrl.editGem()
        $httpBackend.flush()
        expect(typeof gemCtrl.getGem).toBe('object');
        expect(gemCtrl.getGem.updated).toBe('updated');
      });

      it('should delete a gem by id', function(){
        $httpBackend.expectDELETE('http://localhost:3000/gems/12345')
          .respond(200, {msg: 'deleted'})
        gemCtrl.id = '12345';
        gemCtrl.allGems = [
          {
            name: 'ruby', _id: '12345'
          },
          {
            name: 'diamond', _id: '12346'
          }
        ]
        gemCtrl.removeGemFromArr();
        gemCtrl.deleteGemById();
        $httpBackend.flush();
        expect(gemCtrl.getGem.msg).toBe('deleted')
        expect(gemCtrl.allGems.length).toBe(1)
        expect(gemCtrl.allGems[0].name).toBe('diamond')
      });
  });
});
