describe('Client Angular App', function() {
  var users = element(by.binding('student.name'));
  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/');
  })

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Ideas');
  })


})
