require('angular')

angular.module('PeopleApp', [])
  .controller('PeopleController', ['$http', function($http) {
    const route = 'http://localhost:3000/api/people';
    this.test = 'testing yo';
    this.people = ['person'];
    this.getPeople = function() {
      $http.get(route)
        .then((result) => { //2 callbacks args, success and reject
          this.people = result.data.people;
        }, function(err) {

        })
      }
      this.createPerson = function(person) {
        $http.post(route, person)
          .then((res) => {
            console.log(person);
            this.people.push(person);
            this.newPerson = {};
          })
      }
      this.removePerson = function(person) {
        $http.delete(route + '/' + person._id)
          .then((res) => {
            this.people = this.people.filter((p) => p_.id != person._id);
          })
      }

  }]);
