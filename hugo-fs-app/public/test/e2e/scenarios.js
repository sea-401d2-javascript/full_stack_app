describe('some e2e tests', function() {

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/')
  });

  it('should have expected title', function() {
    expect(browser.getTitle()).toEqual('2 Resource with Angular');
  });

  it('should have expected main header', function() {
    expect(element(by.id('main-header')).getText()).toEqual('Welcome!');
  });
  
});
