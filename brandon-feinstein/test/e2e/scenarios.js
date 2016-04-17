describe('our first angular test homepage', function() {
  var user = element(by.model('newUser.name'))
  // var lastName = element(by.model('namectrl.lastName'))
  var newUserButton = element(by.buttonText('New User'))

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/')
  })

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Document')
  })

  // it('should have a default name', function() {
  //   expect(firstName.getAttribute('value')).toEqual('Peggy')
  //   expect(lastName.getAttribute('value')).toEqual('Hill')
  //   expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Peggy Hill')
  // })

  it('can update the name', function() {
    user.clear()
    user.sendKeys('E2E tester')
    // lastName.clear()
    // lastName.sendKeys('UstaHill')
    newUserButton.click()

    expect(user.getAttribute('value')).toEqual('E2E tester')
    // expect(lastName.getAttribute('value')).toEqual('UstaHill')
    // expect(element(by.binding('namectrl.fullName')).getText()).toEqual('Bobby UstaHill')
  })

})
