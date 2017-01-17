'use strict';
const angular = require('angular');
const app = angular.module('SnackApp', []);

app.controller('SnackController', ['$http', 'EditService', function($http, EditService) {
  this.active = null;
  this.edit = false;
  this.snacks = [];
  $http.get('http://localhost:3000/snacks')
    .then((result) => {
      console.log(result.data);
      this.snacks = result.data;
    },
    function(err) {
      console.log(err); 
    });


  this.isActive = function(snack) {
    return snack == this.active;
  };

  this.toggleEdit = function(){
    this.edit = !this.edit; 
  };

  this.makeActive = function(snack) {
    if (this.active == snack) return this.active = null;
    this.active = snack;
  };

  this.updateSnack = function(snackName, snackIngredients, tags) {
    let snack = {
      _id: this.active,
      name: snackName,
      ingredients: snackIngredients.split(', '),
      tags: tags.split(', ')
    };
    $http.put('http://localhost:3000/snacks/' + this.active, snack) 
      .then((res) => {
        console.log(res.data);
        this.snacks = this.snacks.map((s)=>{
          return s._id!=this.active?s:snack;
        });
      },
      function(err) {
        console.log(err);
      });
  };

  this.deleteSnack = function(snack) {
    $http.delete('http://localhost:3000/snacks/' + snack)
      .then(() => {
        this.snacks = this.snacks.filter((s)=>{
          return s._id != snack;
        });
      },
      function(err) {
        console.log(err); 
      });
  };

  this.addSnack = function(snackName, snackIngredients, tags) {
    let snack = {
      name: snackName,
      ingredients: snackIngredients.split(', '),
      tags: tags.split(', ')
    };
    $http.post('http://localhost:3000/snacks', snack) 
      .then((res) => {
        this.snacks.push(res.data); 
      },
      function(err) {
        console.log(err);
      });
  };
}]);

app.directive('snackList', function() {
  return {
    restrict: 'E',
    template: '\
      <edit-snack-form></edit-snack-form>\
      <div data-ng-repeat="snack in snackctrl.snacks">\
        <h1 data-ng-click="snackctrl.makeActive(snack._id)">{{snack.name}}</h1>\
        <button data-ng-click="snackctrl.deleteSnack(snack._id)">DELETE</button>\
        <ul data-ng-show="snackctrl.isActive(snack._id)" data-ng-repeat="ingredient in snack.ingredients">\
          <li>{{ingredient}}</li>\
        </ul>\
        <button data-ng-show="snackctrl.isActive(snack._id)" data-ng-click="snackctrl.toggleEdit()">Edit</button>\
      </div>'
  };
});

app.directive('newSnackForm', function() {
  return {
    restrict: 'E',
    template: '\
      <h1 id="addSnack" data-ng-click="snackctrl.makeActive(\'new\')">Add New Snack</h1>\
      <div data-ng-show="snackctrl.isActive(\'new\')">\
        <input id="newName" data-ng-model="newName" placeholder="Snack Name"></br>\
        <input id="newIngredients" data-ng-model="newIngredients" placeholder="Ingredients, separated by comma"></br>\
        <input id="newTags" data-ng-model="newTags" placeholder="Tags, separated by comma"></br>\
        <button data-ng-click="snackctrl.addSnack(newName, newIngredients, newTags)">Add Snack</button>\
      </div>'
  };
});

app.directive('editSnackForm', function() {
  return {
    restrict: 'E',
    template: '\
      <div data-ng-show="snackctrl.edit == true">\
        <input data-ng-model="newName" placeholder="Snack Name"></br>\
        <input data-ng-model="newIngredients" placeholder="Ingredients, separated by comma"></br>\
        <input data-ng-model="newTags" placeholder="Tags, separated by comma"></br>\
        <button data-ng-click="snackctrl.updateSnack(newName, newIngredients, newTags)">Save Changes</button>\
        <button data-ng-click="snackctrl.toggleEdit()">Cancel</button>\
      </div>'
  };
});

app.factory('EditService', function() {
  var myService = {};
  var edit = false;

  myService.status = function() {
    return edit;
  };

  myService.toggle = function() {
    edit = !edit; 
  };

  return myService;
});
























