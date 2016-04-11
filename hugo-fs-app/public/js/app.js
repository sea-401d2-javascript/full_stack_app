require(__dirname + '/../../bower_components/angular/angular.js');
require(__dirname + '/../css/normalize.css');
require(__dirname + '/../css/main.css');
require(__dirname + '/../css/animate.css');

const app = angular.module('CustomerApp', []);
app.controller('CustomerController', ['$http', function($http) {
  const customersRoute = 'http://localhost:3000/customers';
  const customerOneRoute = 'http://localhost:3000/customers/:id';
  this.customers = [];
  this.products = [];
//customer routes
  //get customers route
  this.getCustomers = function() {
    $http.get(customersRoute)
    .then((result) => {
      console.log(result.data);
      this.customers = result.data;
    }, function(error) {
      console.log('error in getting customers');
    });
  };
  //resets customer value in web form
  this.resetCustomer = function(customer) {
    console.log('reset customer hit!');
    $http.get(customersRoute + '/' + customer._id)
    .then((res) => {
      this.customers[this.customers.indexOf(customer)] = res.data;
    })
    .catch (err => console.log(err));
  };
  //post customers route
  this.createCustomer = function(customer) {
    $http.post(customersRoute, customer)
    .then((res) => {
      this.customers.push(customer);
      this.newCustomer = {};
    });
  };

  //put route
  this.updateCustomer = function(customer) {
    $http.put(customersRoute + '/' + customer._id, customer)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  };
  this.updateCustomer.rendered = null;
  //delete customers route
  this.removeCustomer = function(customer) {
    $http.delete(customersRoute + '/' + customer._id)
    .then((res) => {
      this.customers = this.customers.filter((c) => c._id != customer._id);
    });
  };
}]);



app.controller('ProductController', ['$http', function($http) {
  const productsRoute = 'http://localhost:3000/products';
  const productOneRoute = 'http://localhost:3000/products/:id';
  this.products = [];
  //product routes
    //get products route
  this.getProducts = function() {
    $http.get(productsRoute)
      .then((result) => {
        console.log(result.data);
        this.products = result.data;
      }, function(error) {
        console.log('error getting products');
      });
  };
  //resets product value in web form
  this.resetProduct = function(product) {
    $http.get(productsRoute + '/' + product._id)
    .then((res) => {
      this.products[this.products.indexOf(product)] = res.data;
    })
    .catch((err) => console.log(err));
  };
    //post product route
  this.createProduct = function(product) {
    $http.post(productsRoute, product)
      .then((res) => {
        this.products.push(product);
        this.newProduct = {};
      });
  };

  this.updateProduct = function(product) {
    $http.put(productsRoute + '/' + product._id, product)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  this.updateProduct.rendered = null;
    //delete product route
  this.deleteProduct = function(product) {
    $http.delete(productsRoute + '/' + product._id)
    .then((res) => {
      this.products = this.products.filter((p) => p._id != product._id);
    });
  };
}]);
