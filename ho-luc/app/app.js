'use strict'
const angular = require('angular')

angular.module('TwoResourceApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/people';
    this.people = [];
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
    this.updatePerson = function(person, data) {
      $http.put(route + '/' + person._id, data)
        .then((res) => {
          console.log('this is data', data);
          console.log('this is res', res);
          // var updatedPerson = this.people.filter((p) => p._id != person._id);
          // this.people =
        }, function(error) {
          console.log(error);
        })
    }

}])

.controller('AnimalController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/animals';
    this.animals = [];
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
    this.updatePerson = function(animal, data) {
      $http.put(route + '/' + animal._id, data)
        .then((res) => {
          console.log(res);
          // var updatedPerson = this.people.filter((p) => p._id != animal._id);
          // this.people =
        }, function(error) {
          console.log(error);
        })
    }

}]);
