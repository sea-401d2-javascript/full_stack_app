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

describe('it should test something', () => {
  var RecipeController;
  it('should have a test', () => {
    expect(false).toBe(false);
  });

  beforeEach(angular.mock.module('ChefApp'));
  beforeEach(angular.mock.inject(function($controller) {
    RecipeController = $controller('RecipeController');
  }));

  it('should construct a controller', ()=> {
    expect(typeof RecipeController).toBe('object');
    expect(typeof RecipeController.createRecipe).toBe('function');
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

    it('should get all recipes', ()=> {
      $httpBackend.expectGET('http://localhost:3000/recipes')
        .respond(200, {data: [{name: 'test recipe'}]});
      RecipeController.getRecipes();
      $httpBackend.flush();
      expect(RecipeController.recipes.length).toBe(1);
      expect(RecipeController.recipes[0].name).toBe('test recipe');
    });

    it('should create a new recipe', ()=> {
      $httpBackend.expectPOST('http://localhost:3000/recipes', {name: 'test recipe name'})
        .respond(200, {name: 'test recipe name', cookTime: 30, _id:'uniqueid'});
      RecipeController.createRecipe({name: 'test recipe name'});
      $httpBackend.flush();
      expect(RecipeController.recipes.length).toBeGreaterThan(0);
      expect(RecipeController.recipes[1].name).toBe('test recipe name');
      // expect(ChefController.newChef).toBe('object');
    });

    it('should update a recipe', ()=> {
      $httpBackend.expectPUT('http://localhost:3000/recipes/2')
        .respond(200, {data: [{name: 'test recipe', cookTime: 30, _id: 2}]});
      RecipeController.recipes.push({name: 'test chef', cookTime: 30, _id: 2});
      RecipeController.updateRecipe({name: 'updated recipe', cookTime: 45, _id: 2});
      $httpBackend.flush();
      expect(RecipeController.recipes.length).toBe(2);
      expect(RecipeController.recipes.every((r) => r._id = 2)).toBe(true);
      // expect(ChefController.chefs[1].name).toBe('updated chef');
    });

    it('should delete a recipe', ()=> {
      $httpBackend.expectDELETE('http://localhost:3000/recipes/3')
        .respond(200);
      RecipeController.recipes.push({name: 'test recipe', _id: 3});
      RecipeController.removeRecipe({name: 'test recipe', _id:3});
      $httpBackend.flush();
      expect(RecipeController.recipes.length).toBe(1);
      expect(RecipeController.recipes.every((r)=> r._id != 3)).toBe(true);
    });
  });
});
