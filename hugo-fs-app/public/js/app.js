require(__dirname + '/../../bower_components/angular/angular.js');
require(__dirname + '/../css/main.css');
//needs put routes!!!!
const app = angular.module('CustomerApp', []);
app.controller('CustomerController', ['$http', function($http) {
  const customersRoute = 'http://localhost:3000/customers';
  const productsRoute = 'http://localhost:3000/products';
  const customerOneRoute = 'http://localhost:3000/customers/:id';
  const productOneRoute = 'http://localhost:3000/products/:id';
  this.customers = [];
  this.products = [];
//customer routes
  //get customers route
  this.getCustomers = function() {
    $http.get(customersRoute)
    .then((result) => {
      this.customers = result.data.customers;
    }, function(error) {
      console.log('error in getting customers');;
    })
  }
  //post customers route
  this.createCustomer = function(customer) {
    $http.post(customersRoute, customer)
    .then((res) => {
      this.customers.push(customer);
      this.newCustomer = {};
    })
  }
  //delete customers route
  this.removeCustomer = function(customer) {
    $http.delete(customersRoute + '/' + customer._id)
    .then((res) => {
      this.customers = this.customers.filter((c) => c._id != customer._id)
    })
  }
  //product routes
    //get products route
    this.getProducts = function() {
      $http.get(productsRoute)
      .then((result) => {
        this.products = result.data.products;
      }, function(error) {
        console.log('error getting products');
      })
    }
    //post product route
    this.createProduct = function(product) {
      $http.post(productsRoute, product)
      .then((res) => {
        this.products.push(product);
        this.newProduct = {};
      })
    }
    //delete product route
    $http.delete(productsRoute + '/' + product._id)
    .then((res) => {
      this.products = this.products.filter((p) => p._id != product._id)
    })



}]);
