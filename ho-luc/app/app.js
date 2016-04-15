'use strict'
const angular = require('angular')

angular.module('TwoResourceApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/people';
    const main = this;

    main.people = [];
    main.edit = null;
    main.getPeople = function() {
      $http.get(route)
        .then(function(result) {
          main.people = result.data.data;
        }, (error) => console.log(error));
    };

    main.createPerson = function(person) {
      $http.post(route, person)
        .then(function(res){
          console.log(res);
          main.people.push(res.data);
          main.newPerson = {};
        }, (error) => console.log(error));
    };

    main.removePerson = function(person) {
      console.log('client : ' + person);
      $http.delete(route + '/' + person)
        .then(function(res) {
          main.people = main.people.filter((p) => p._id != person._id);
        }, (error) => console.log(error));
    };

    main.updatePerson = function(person) {
      main.edit = false;
      $http.put(route + '/' + person._id, data)
        .then(function(res) {
          console.log('person editted');
        }, (error) => console.log(error));
    };

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
          this.animal = {};
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
