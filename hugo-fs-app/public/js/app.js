require(__dirname + '/../../bower_components/angular/angular.js');
require(__dirname + '/css/main.css');

const app = angular.module('CustomerApp', []);
app.controller('CustomerController', ['$http', function($http) {
  const customersRoute = 'http://localhost:3000/customers';
  const productsRoute = 'http://localhost:3000/products';
  const customerOneRoute = 'http://localhost:3000/customers/:id';
  const productOneRoute = 'http://localhost:3000/products/:id';
  this.customers = [];
  this.products = [];
//get customers route
  this.getCustomers = function() {
    $http.get(customersRoute)
    .then((result) => {
      this.customers = result.data.customers;
    }, function(error) {
      console.log('error in getting customers');
    })
  }
  this.createCustomer = function(customer) {
    $http.post(customersRoute, customer)
    .then((res) => {
      this.customers.push(customer);
      this.newCustomer = {};
    })
  }
  this.removeCustomer = function(customer) {
    $http.delete(customersRoute + '/' + customer._id)
    .then((res) => {
      this.customers = this.customers.filter((c) => c._id != customer._id)
    })
  }

}]);
