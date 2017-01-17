'use strict';
const angular = require('angular');

const app = angular.module('ChefApp', []);
app.controller('ChefController', ['$http', function($http) {
  const mainRoute = 'http://localhost:3000/chefs';
  this.chefs = {};
  this.chefs = ['chef'];
  this.getChefs = function() {
    $http.get(mainRoute)
    .then((result) => {
      this.chefs = result.data.data;
    }, function (error) {
      console.log(error);
    });
  };
  this.createChef = function(chef) {
    $http.post(mainRoute, chef)
    .then((res) => {
      this.chefs.push(res.data);
      this.newChef = {};
    });
  };

  this.updateChef = function(chef) {
    $http.put(mainRoute + '/' + chef._id, chef)
    .catch((err) => {
      console.log(err);
    });
    this.updateChef.displayed = null;
  };
  
  this.resetChef = function(chef) {
    $http.get(mainRoute + '/' + chef._id)
    .then((res) => {
      this.chefs[this.chefs.indexOf(chef)] = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  };

  this.removeChef = function(chef) {
    $http.delete(mainRoute + '/' + chef._id)
    .then((res) => {
      this.chefs = this.chefs.filter((c) => c._id != chef._id);
    });

  };
}]);

app.controller('RecipeController', ['$http', function($http) {
  const mainRecipesRoute = 'http://localhost:3000/recipes';
  this.recipes = {};
  this.recipes = ['recipe'];
  this.getRecipes = function() {
    $http.get(mainRecipesRoute)
    .then((result) => {
      this.recipes = result.data.data;
    }, function (error) {
      console.log(error);

    });
  };
  this.createRecipe = function(recipe) {
    $http.post(mainRecipesRoute, recipe)
    .then((res) => {
      this.recipes.push(res.data);
      this.newRecipe = {};
    });
  };

  this.updateRecipe = function(recipe) {
    $http.put(mainRecipesRoute + '/' + recipe._id, recipe)
    .catch((err) => {
      console.log(err);
    });
    this.updateRecipe.displayed = null;
  };

  this.resetRecipe = function(recipe) {
    $http.get(mainRecipesRoute + '/' + recipe._id)
      .then((res) => {
        this.recipes[this.recipes.indexOf(recipe)] = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  this.removeRecipe = function(recipe) {
    $http.delete(mainRecipesRoute + '/' + recipe._id)
    .then((res) => {
      this.recipes = this.recipes.filter((r) => r._id != recipe._id);
    });

  };
}]);
