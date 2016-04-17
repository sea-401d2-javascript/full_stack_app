describe('full-stack angular test', function() {
  var user = element(by.model('newUser.name'));
  // var updateUser = element(by.model('newUser'));

  var newUserButton = element(by.buttonText('New User'));
  // var editButton = element(by.buttonText('Edit'));
  //
  // var updateUserButton = element(by.buttonText('Update'));


  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/');
  });

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Document');
  });

  it('can create a new user', function() {
    user.clear();
    user.sendKeys('E2E tester');
    newUserButton.click();
    expect(user.getAttribute('value')).toEqual('E2E tester');
  });

  // it('can update user name', function() {
  //   user.clear();
  //   user.sendKeys('E2E tester');
  //   newUserButton.click();
  //   editButton.click();
  //   updateUser.sendKeys('E2E update')
  //   updateUserButton.click();
  //   expect(updateUser.getAttribute('value')).toEqual('E2E update');
  // })
})
