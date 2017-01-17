'use strict'
const angular = require('angular')

var app = angular.module('TwoResourceApp', []);
require('./services/http-service')(app)

app.controller('PeopleController', ['ResourceService', function(ResourceService) {
    const peopleResource = ResourceService('people')
    const main = this;
    main.people = [];

    main.getPeople = function() {
      peopleResource.getAll()
        .then((result) => {
          main.people = result.data.data;
        }, (error) => console.log(error));
    };

    main.createPerson = function(person) {
      peopleResource.create(person)
        .then((res) => {
          console.log('create person');
          main.people.push(res.data.data);
          main.newPerson = null;
        }, (error) => console.log(error));
    };

    main.removePerson = function(person) {
      peopleResource.delete(person)
        .then((res) => {
          console.log('delete getting hit');
          main.people = main.people.filter((p) => p._id != person._id)
        }, (error) => console.log(error));
    };

    main.updatePerson = function(person) {
      peopleResource.update(person)
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
.directive('peopleDirective', function() {
  return {
    restrict: 'E',
    controller: 'PeopleController',
    templateUrl: './people.html'
  }
})


app.controller('AnimalController', ['ResourceService', function(ResourceService) {
    const animalResource = ResourceService('animals');
    const main = this;
    main.animals = [];

    main.getAnimal = function() {
      animalResource.getAll()
        .then((result) => {
          main.animals = result.data.data;
        }, function(error) {
          console.log(error);
        })
    };
    main.createAnimal = function(animal) {
      animalResource.create(animal)
        .then((res) => {
          main.animals.push(res.data.data);
          main.newAnimal = null;
        }, function(error) {
          console.log(error);
        })
    };
    main.removeAnimal = function(animal) {
      animalResource.delete(animal)
        .then((res) => {
          main.animals = main.animals.filter((p) => p._id != animal._id)
        }, (error) => console.log(error));
    };
    main.updateAnimal = function(animal) {
      animalResource.update(animal)
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
}])
.directive('animalDirective', function() {
  return {
    restrict: 'E',
    controller: 'AnimalController',
    templateUrl: './animals.html'
  }
})
