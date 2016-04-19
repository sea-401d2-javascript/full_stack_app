describe('testing app e2e for people', function() {
  var name = element(by.model('peoplectrl.newPerson.name'));
  var favFood = element(by.model('peoplectrl.newPerson.favoriteFood'));
  var age = element(by.model('peoplectrl.newPerson.age'));
  var saveButton = element(by.buttonText('New Person'));

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/')
  })

  it('should add a person', function() {
    name.sendKeys('dude');
    favFood.sendKeys('burgers');
    age.sendKeys(21);
    saveButton.click();

    expect(name.getAttribute('value')).toEqual('dude');
    expect(favFood.getAttribute('value')).toEqual('burgers');
    expect(age.getAttribute('value')).toEqual('21');
  })
})
