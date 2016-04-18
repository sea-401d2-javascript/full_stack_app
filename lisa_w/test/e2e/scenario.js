'use strict';
describe('my arcadeapp homepage', function(){
  var inputName = element(by.model('newArcade.name'));
  var inputAddress = element(by.model('newArcade.address'));
  var inputHours = element(by.model('newArcade.hours'));
  var updateButton = element(by.buttonText('Save Arcade'));
  var deleteButton = element(by.buttonText('Delete'));

beforeEach(function(){
  browser.get('http://localhost:8080');
});
it('should have same title as in header', function(){
  expect(browser.getTitle()).toEqual('Arcade App');
});
it('should get create a new arcade', function(){
  inputName.sendKeys('Test Arcade');
  expect(inputName.getAttribute('value')).toBe('Test Arcade');
  inputAddress.sendKeys('12345');
  expect(inputAddress.getAttribute('value')).toBe('12345');
  inputHours.sendKeys('Sat-Sun 9-5');
  expect(inputHours.getAttribute('value')).toBe('Sat-Sun 9-5');

});
it('should update the arcade', function(){
  inputName.clear();
  inputName.sendKeys('Freddy');
  inputAddress.clear();
  inputAddress.sendKeys('9867');
  inputHours.clear();
  inputHours.sendKeys('Mon-Weds 9-8');
  updateButton.click();
  expect(inputName.getAttribute('value')).toBe('Freddy');
  expect(inputAddress.getAttribute('value')).toBe('9867');
  expect(inputHours.getAttribute('value')).toBe('Mon-Weds 9-8');


})

});

// describe('our first angular test homepage', function() {
//   var firstName = element(by.model('namectrl.firstName'))
//   var lastName = element(by.model('namectrl.lastName'))
//   var updateButton = element(by.buttonText('Update Name'))
//
//   beforeEach(function() {
//     browser.get('http://127.0.0.1:8080/')
//   })
//
//   it('should have the correct title', function() {
//     expect(browser.getTitle()).toEqual('My First Angular Test')
//   })
//
//   it('should have a default name', function() {
//     expect(firstName.getAttribute('value')).toEqual('Peggy')
//     expect(lastName.getAttribute('value')).toEqual('Hill')
//     expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Peggy Hill')
//   })
//
//   it('can update the name', function() {
//     firstName.clear()
//     firstName.sendKeys('Bobby')
//     lastName.clear()
//     lastName.sendKeys('UstaHill')
//     updateButton.click()
//
//     expect(firstName.getAttribute('value')).toEqual('Bobby')
//     expect(lastName.getAttribute('value')).toEqual('UstaHill')
//     expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Bobby UstaHill')
//   })
//
// })
