describe('ghost routes / really should have picked a less absurd set of resouces jesus christ', function(){

  beforeEach(function(){
    browser.get('http://127.0.0.1:8080')
  })
  it('should add ghost', function(){
    element(by.model('ghostctrl.newGhost.name')).sendKeys('TestGhostA');
    element(by.id('ghost')).click()
    expect(element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.binding('ghost.name')).getText()).toEqual('Name: TestGhostA')
  })

  it('should update ghost', function(){
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.id('ghostEdit')).click()
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.model('ghostctrl.changedGhost.ghost.name')).sendKeys('NewName');
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.id('ghostEditSubmit')).click()
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.id('ghostEditSubmit')).click()
    expect(element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.binding('ghost.name')).getText()).toEqual('Name: NewName')
  })

  it('should delete ghost', function(){
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.id('ghostEdit')).click()
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.buttonText('Delete Ghost')).click()
    element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.buttonText('Delete Ghost')).click()
    expect(element.all(by.repeater('ghost in ghostctrl.ghosts')).last().element(by.binding('ghost.name')).getText()).not.toEqual('Name: NewName')
  })
})

describe('human routes', function(){

  beforeEach(function(){
    browser.get('http://127.0.0.1:8080')
    element(by.id('humanTab')).click()
  })
  it('should add human', function(){
    element(by.model('humanctrl.newHuman.name')).sendKeys('TestHumanA');
    element(by.id('human')).click()
    expect(element.all(by.repeater('human in humanctrl.humans')).last().element(by.binding('human.name')).getText()).toEqual('Name: TestHumanA')
  })

  it('should update human', function(){
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.id('humanEdit')).click()
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.model('humanctrl.changedHuman.name')).sendKeys('NewName');
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.id('humanEditSubmit')).click()
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.id('humanEditSubmit')).click()
    expect(element.all(by.repeater('human in humanctrl.humans')).last().element(by.binding('human.name')).getText()).toEqual('Name: NewName')
  })

  it('should delete human', function(){
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.id('humanEdit')).click()
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.buttonText('Delete Human')).click()
    element.all(by.repeater('human in humanctrl.humans')).last().element(by.buttonText('Delete Human')).click()
    expect(element.all(by.repeater('human in humanctrl.humans')).last().element(by.binding('human.name')).getText()).not.toEqual('Name: NewName')
  })
})
