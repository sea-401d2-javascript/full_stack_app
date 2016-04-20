'use strict';
// require(__dirname + '/../../js/customers/customer-module.js');
// // require(__dirname + '/../../bower_components/angular/angular.js');
//
// let CustomerController = require('/../js/customers/customers.js')


describe('some e2e tests', function() {
  let customerName, customerAge, customerEmail, customerButton, saveButton, discardButton, updateButton, deleteButton, li;

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/');
    customerName    = element(by.model('customer.name'));
    customerAge     = element(by.model('customer.age'));
    customerEmail   = element(by.model('customer.email'));
    customerButton  = element(by.buttonText('Create customer'));
    saveButton      = element(by.buttonText('Save Changes'));
    discardButton   = element(by.buttonText('Discard Changes'));
    li              = element(by.id('info-line'));
  });
    updateButton    = element(by.buttonText('update record'));
    deleteButton    = element(by.buttonText('delete record'));


  it('should have expected title', function() {
    expect(browser.getTitle()).toEqual('2 Resource with Angular');
  });

  it('should have expected main header', function() {
    expect(element(by.id('main-header')).getText()).toEqual('Welcome!');
  });

  // it('should create a new user', function() {
  //   customerButton.click();
  //   customerName.sendKeys('yogi bear');
  //   customerAge.sendKeys('26');
  //   customerEmail.sendKeys('super@aol.com');
  //   saveButton.click();
  //   expect(element(by.binding('customer.name')).getText()).toEqual('name: yogi bear')
  // });
  it('should display the correct create customer button text functionality', function() {
    expect(customerButton.getText()).toEqual('Create customer');
  });
  //   customerButton.click().then(function(){
  //     expect(saveButton.getText()).toEqual('Save Changes');
  //     expect(discardButton.getText()).toEqual('Discard Changes');
  //
  //   })
  // });
  //
  // it('should display the correct update and delete button functionality', function() {
  //   expect(updateButton.getText()).toEqual('update record');
  //   expect(deleteButton.getText()).toEqual('delete record');
  // });

});
