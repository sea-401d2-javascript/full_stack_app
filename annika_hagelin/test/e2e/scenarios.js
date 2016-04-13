describe('trees and species testing', function() {
  var resource = element(by.binding('speciessCtrl.resource'));

  beforeEach(function() {
    browser.get('http://localhost:8080');
  });

  it('have correct resource', function() {
    expect(resource.getText()).toEqual('speciess'.toUpperCase());
  });

});
