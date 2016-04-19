'use strict'
const angular = require('angular')

angular.module('TwoResourceApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/people';
    const main = this;
    main.people = [];

    main.getPeople = function() {
      $http.get(route)
        .then((result) => {
          main.people = result.data.data;
        }, (error) => console.log(error));
    };

    main.createPerson = function(person) {
      $http.post(route, person)
        .then((res) => {
          console.log('create person');
          main.people.push(res.data.data);
          main.newPerson = null;
        }, (error) => console.log(error));
    };

    main.removePerson = function(person) {
      $http.delete(route + '/' + person._id)
        .then((res) => {
          console.log('delete getting hit');
          main.people = main.people.filter((p) => p._id != person._id)
        }, (error) => console.log(error));
    };

    main.updatePerson = function(person) {
      $http.put(route + '/' + person._id, person)
        .then((res) => {
          console.log('update person');
          person.editing = false;
        }, (error) => console.log(error));
    };

    main.toggleForm = function(person) {
      if(!person.editing) {
        person.newName = person.name;
        person.editing = true;
      } else {
        person.name = person.newName;
        person.editing = false;
      }
    }
}])

.controller('AnimalController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/animals';
    const main = this;
    main.animals = [];

    main.getAnimal = function() {
      $http.get(route)
        .then((result) => {
          main.animals = result.data.data;
        }, function(error) {
          console.log(error);
        })
    };
    main.createAnimal = function(animal) {
      $http.post(route, animal)
        .then((res) => {
          main.animals.push(res.data.data);
          main.newAnimal = null;
        }, function(error) {
          console.log(error);
        })
    };
    main.removeAnimal = function(animal) {
      $http.delete(route + '/' + animal._id)
        .then((res) => {
          main.animals = main.animals.filter((p) => p._id != animal._id)
        }, (error) => console.log(error));
    };
    main.updateAnimal = function(animal) {
      $http.put(route + '/' + animal._id, animal)
        .then((res) => {
          animal.editing = false;
        }, function(error) {
          console.log(error);
        })
    };

    main.toggleForm = function(animal) {
      if(!animal.editing) {
        animal.newName = animal.name;
        animal.editing = true;
      } else {
        animal.name = animal.newName;
        animal.editing = false;
      }
    };

}]);
