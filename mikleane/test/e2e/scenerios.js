
process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';

require(__dirname +'/../../server.js')


describe('testing the angular homepage', function() {
  beforeEach(function() {
    browser.get('http:127.0.0.1:8080/')
  })
  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('The Joy of Beer')
  })

  it ('should test ability to add new Beer', function() {
    var name = element(by.model('newBeer.name'))
    var type = element(by.model('newBeer.type'))
    var style = element(by.model('newBeer.style'))
    var brewery = element(by.model('newBeer.brewery'))
    var beers = element(by.id('beerarray'))
    var addButton = element(by.buttonText('Add New Beer'))

    name.clear();
    name.sendKeys('Smokey')
    type.clear()
    type.sendKeys('ale')
    style.clear()
    style.sendKeys('IPA')
    brewery.clear()
    brewery.sendKeys('Black Raven')
    addButton.click()

    expect(name.getAttribute('value')).toEqual('Smokey')
    expect(type.getAttribute('value')).toEqual('ale')
    expect(style.getAttribute('value')).toEqual('IPA')
    expect(brewery.getAttribute('value')).toEqual('Black Raven')
    expect(beers.getText()).toContain('Smokey');
    expect(beers.getText()).toContain('ale');
    expect(beers.getText()).toContain('IPA');
    expect(beers.getText()).toContain('Black Raven');

  })

  it('should test adding a new User', function() {
    var firstName = element(by.model('newUser.firstName'))
    var lastName = element(by.model('newUser.lastName'))
    var favBeers = element(by.model('newUser.favBeers'))
    var users = element(by.id('userarray'))
    var addUserButton = element(by.buttonText('Add New User'))

    firstName.clear();
    firstName.sendKeys('Leslee')
    lastName.clear();
    lastName.sendKeys('Paganelli')
    favBeers.clear();
    favBeers.sendKeys('ales, lagers')
    addUserButton.click();

    expect(firstName.getAttribute('value')).toEqual('Leslee')
    expect(lastName.getAttribute('value')).toEqual('Paganelli')
    expect(favBeers.getAttribute('value')).toEqual('ales, lagers')
    expect(users.getText()).toContain('Leslee');
    expect(users.getText()).toContain('Paganelli');
    expect(users.getText()).toContain('ales, lagers');

  })

  it('should modify an existing user', function() {
    var updatebut = element(by.buttonText('Update User'))
    var changebut = element(by.buttonText('Change User'))
    var firstName = element(by.model('user.firstName'))
    var lastName = element(by.model('user.lastName'))
    var favBeers = element(by.model('user.favBeers'))
    var users = element(by.id('userarray'))
    var userList = element.all(by.repeater('usersctrl.users'));

    updatebut.click();
    element(by.id('userupdate')).isDisplayed()
    firstName.clear();
    firstName.sendKeys('Mikleane')
    changebut.click();

    expect(firstName.getAttribute('value')).toEqual('Mikleane')
    expect(lastName.getAttribute('value')).toEqual('Paganelli')
    expect(favBeers.getAttribute('value')).toEqual('ales, lagers')
    expect(users.getText()).toContain('Mikleane');
    expect(users.getText()).toContain('Paganelli');
    expect(users.getText()).toContain('ales, lagers');
    expect(userList.get(0).getText()).toContain('Mikleane');

  })

  it('should modify an existing beer', function() {
    var updatebut = element(by.buttonText('Edit Beer'))
    var changebut = element(by.buttonText('Make Changes'))
    var name = element(by.model('beer.name'))
    var type = element(by.model('beer.type'))
    var style = element(by.model('beer.style'))
    var brewery = element(by.model('beer.brewery'))
    var beers = element(by.id('beerarray'))
    var beerList = element.all(by.repeater('beersctrl.beers'));

    updatebut.click();
    element(by.id('beerupdate')).isDisplayed()
    name.clear();
    name.sendKeys('Porter')
    changebut.click();

    expect(name.getAttribute('value')).toEqual('Porter')
    expect(type.getAttribute('value')).toEqual('ale')
    expect(style.getAttribute('value')).toEqual('IPA')
    expect(brewery.getAttribute('value')).toEqual('Black Raven')
    expect(beers.getText()).toContain('Porter');
    expect(beers.getText()).toContain('ale');
    expect(beers.getText()).toContain('IPA');
    expect(beers.getText()).toContain('Black Raven');
    expect(beerList.get(0).getText()).toContain('Porter');
  })

  it('should be able to delete a beer', function() {
    var deleteBeer = element(by.buttonText('Delete Beer'))
    var beers = element(by.id('beerarray'))
    var beerList = element.all(by.repeater('beersctrl.beers'));
    var beerToDelete = 'Porter'

    element.all(by.repeater('beer in beersctrl.beers')).filter(function(row){
      return row.element(by.model('beer.name')).getText().then(function(name){
        return name === beerToDelete;
      });
    })
    .get(0)
    deleteBeer.click()

    expect(beerList.names).not.toContain(beerToDelete);


  })
  it('should be able to delete a user', function() {
    var deleteUser = element(by.buttonText('Delete User'))
    var users = element(by.id('userarray'))
    var userList = element.all(by.repeater('usersctrl.users'));
    var userToDelete = 'Mikleane'

    element.all(by.repeater('user in usersctrl.users')).filter(function(row){
      return row.element(by.model('user.firstName')).getText().then(function(name){
        return name === userToDelete;
      });
    })
    .get(0)
    deleteUser.click()
  })

})
