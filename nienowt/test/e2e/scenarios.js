describe('ghost routes / really should have picked a less absurd set of resouces jesus christ', function(){

  beforeEach(function(){
    browser.get('http://127.0.0.1:8080')
  })
  it('should update ghost', function(){
    element(by.model('ghostctrl.newGhost.name')).sendKeys('TestGhostA');
    // ghostctrl.newGhost.name.sendKeys('TestGhostA');
    // ghostctrl.newGhost.powers.primary.sendKeys('profound sadness');
    element(by.id('ghost')).click()
    expect(element.all(by.repeater('ghost in ghostctrl.ghosts')).last().getText()).toEqual('TestGhostA Edit')
  })
})
