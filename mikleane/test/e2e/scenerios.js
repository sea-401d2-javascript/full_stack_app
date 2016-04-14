// require(__dirname +'/../../server.js')




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

  })

  it('should test adding a new User', function() {
    var firstName = element(by.model('newUser.firstName'))
    var lastName = element(by.model('newUser.lastName'))
    var favBeers = element(by.model('newUser.favBeers'))
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


  })

})
