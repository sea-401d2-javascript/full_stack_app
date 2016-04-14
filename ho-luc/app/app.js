'use strict'
const angular = require('angular')

angular.module('TwoResourceApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/people';
    this.people = [];
    this.edit = null;
    this.getPeople = function() {
      $http.get(route)
        .then((result) => {
          this.people = result.data.data;
        }, function(error) {
          console.log(error);
        })
    };
    this.createPerson = function(person) {
      $http.post(route, person)
        .then((res) => {
          this.people.push(person);
          this.newPerson = {};
        }, function(error) {
          console.log(error);
        })
    };
    this.removePerson = function(person) {
      $http.delete(route + '/' + person._id)
        .then((res) => {
          this.people = this.people.filter((p) => p._id != person._id);
        })
    };
    this.updatePerson = function(person) {
      this.edit = false;
      $http.put(route + '/' + person._id, data)
        .then((res) => {
          console.log('person editted');
        }, function(error) {
          console.log(error);
        })
    }

}])

.controller('AnimalController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/animals';
    this.animals = [];
    this.edit = null;
    this.getAnimal = function() {
      $http.get(route)
        .then((result) => {
          this.animals = result.data.data;
        }, function(error) {
          console.log(error);
        })
    };
    this.createAnimal = function(animal) {
      $http.post(route, animal)
        .then((res) => {
          this.animals.push(animal);
          this.newAnimal = {};
        }, function(error) {
          console.log(error);
        })
    };
    this.removeAnimal = function(animal) {
      $http.delete(route + '/' + animal._id)
        .then((res) => {
          this.animals = this.animals.filter((p) => p._id != animal._id);
        })
    };
    this.updateAnimal = function(animal, data) {
      this.edit = false;
      $http.put(route + '/' + animal._id, data)
        .then((res) => {
          console.log('person edited');
        }, function(error) {
          console.log(error);
        })
    }

}]);
