describe('first e2e tests for full stack angular app', function(){
  var name = element(by.model('newChef.name'));
  var password = element(by.model('newChef.password'));
  var funFact = element(by.model('newChef.funFact'));

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/');
  });

  it('should have a correct title', function(){
    expect(browser.getTitle()).toEqual('Chef and Recipe full stack angular app');
  });

  it('should make a chef', function(){
    name.clear();
    name.sendKeys('Rachel');
    password.clear();
    password.sendKeys('password');
    funFact.clear();
    funFact.sendKeys('loves js');
    expect(name.getAttribute('value')).toEqual('Rachel');
    expect(password.getAttribute('value')).toEqual('password');
    expect(funFact.getAttribute('value')).toEqual('loves js');
  });
});
