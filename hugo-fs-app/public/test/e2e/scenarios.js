describe('some e2e tests', function() {
  let customerName, customerAge, customerEmail;

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/');
    customerName    = element(by.model('customer.name'));
    customerAge     = element(by.model('customer.age'));
    customerEmail   = element(by.model('customer.email'));
    customerButton  = element(by.buttonText('Create customer'));
    saveButton      = element(by.buttonText('Save Changes'));
    DiscardButton   = element(by.buttonText('Discard Changes'));
  });

  it('should have expected title', function() {
    expect(browser.getTitle()).toEqual('2 Resource with Angular');
  });

  it('should have expected main header', function() {
    expect(element(by.id('main-header')).getText()).toEqual('Welcome!');
  });

});
