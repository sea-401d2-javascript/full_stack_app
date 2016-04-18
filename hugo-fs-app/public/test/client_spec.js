'use strict';

require('../js/app.js');
const angular = require('angular');
require('angular-mocks');

describe('testing customer REST routes', () => {
  var $httpBackend;
  var CustomerController;
  var customerRoute = 'http://localhost:3000/customers';
  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));
  beforeEach(angular.mock.inject(function($controller) {
    CustomerController = $controller('CustomerController');
  }))
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get all customers', () => {
    $httpBackend.expectGET(customerRoute)
      .respond(200, {name: 'test larry'});
      CustomerController.getCustomers();
      $httpBackend.flush();
      expect(CustomerController.customers.length).toBeGreaterThan(0);
      expect(CustomerController.customers[0].name).toBe('test larry');
  });

  it('should create a new customer', () => {
    $httpBackend.expectPOST(customerRoute, {name: 'test martin'})
      .respond(200, {name:'test martin', age: 24, email:'some@email.com', id:'1234'});
      CustomerController.createCustomer({name:'test martin', age: 24, email:'some@email.com', id:'1234'});
      $httpBackend.flush();
      expect(CustomerController.customers.length).toBe(2);
      expect(CustomerController.customers[1].name).toBe('test martin');
      expect(CustomerController.newCustomer).toBeNull();
  });

  it('should delete a customer', () => {
    $httpBackend.expectDELETE(customerRoute + '/' + 1234)
      .respond(200, 'deleted');
      CustomerController.customers.push({name:'test dale', _id: 456});
      CustomerController.removeCustomer({name: 'test dale', _id: 456});
      $httpBackend.flush();
      expect(CustomerController.customers.length).toBe(1);
      expect(CustomerController.customers.every((c) => c._id != 456)).toBe(true);
  });

  it('should update a customer', () => {
    var updateCustomer = {name: 'test dale, _id: 456'};
    $httpBackend.expectPUT(customerRoute + '/' + 456)
      .respond(200, 'updated');
      CustomerController.customers.push(updateCustomer);
      CustomerController.updateCustomer(updateCustomer);
      $httpBackend.flush();
      expect(updateCustomer.editing).toBe(false);
  });
});

describe('REST tests for products', () => {
  var $httpBackend;
  var ProductController;
  var productsRoute = 'http://localhost:3000/products';
  beforeEach(angular.mock.module('app'))
  beforeEach(angular.mock.inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));
  beforeEach(angular.mock.inject(function($controller) {
    ProductController = $controller('ProductController');
  }))
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  it('should get all products', () => {
    $httpBackend.expectGET(productsRoute)
      .respond(200, {name: 'orange', upc: '123456', category: 'produce', stock: 56});
      ProductController.getProducts();
      $httpBackend.flush();
      expect(ProductController.products.length).toBeGreaterThan(0);
      expect(ProductController.products[0].name).toBe('orange');
  });
  it('should create a new product', () => {
    $httpBackend.expectPOST(productsRoute, {name: 'post orange'})
      .respond(200, {name: 'post orange', upc: '123456', category: 'produce', stock: 56, _id: '987'});
      ProductController.createProduct({name: 'post orange', upc: '123456', category: 'produce', stock: 56, _id: '987'});
      $httpBackend.flush();
      expect(ProductController.products.length).toBe(2);
      expect(ProductController.products[1].name).toBe('post orange');
      expect(ProductController.newProduct).toBeNull();
  });
  it('should delete a product', () => {
    $httpBackend.expectDELETE(productsRoute + '/' + 987)
      .respond(200, 'deleted');
      ProductController.products.push({name: 'post orange', upc: '123456', category: 'produce', stock: 56, _id: '987'});
      ProductController.deleteProduct({name: 'post orange', upc: '123456', category: 'produce', stock: 56, _id: '987'});
      $httpBackend.flush();
      expect(ProductController.products.length).toBe(1);
      expect(ProductController.products.every((p) => p._id != 987)).toBe(true);
  });
  it('should update a product', () => {
    var updateProduct = {name: 'post orange', upc: '123456', category: 'produce', stock: 56, _id: '987'};
    $httpBackend.expectPUT(productsRoute + '/' + 987)
      .respond(200, 'updated');
      ProductController.products.push(updateProduct);
      ProductController.updateProduct(updateProduct);
      $httpBackend.flush();
      expect(updateProduct.editing).toBe(false);
  });
});
