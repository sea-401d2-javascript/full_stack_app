describe('e2e testing on my homepage', function(){
  beforeEach(function(){
      browser.get('http://127.0.0.1:8080/');
  });

  it('should have the correct title', function(){
    expect(browser.getTitle()).toEqual('Full Stack App');
  });
})
