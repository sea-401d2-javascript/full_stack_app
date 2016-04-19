describe('Client Angular App', function() {
  var name = element(by.model('newStudent.name'));
  var password = element(by.model('newStudent.password'));
  var track = element(by.model('newStudent.track'));
  var newStudentButton = element(by.buttonText('New Student'))
  var sector = element(by.model('newIdea.sector'));
  var lang = element(by.model('newIdea.lang'));
  var teamSize = element(by.model('newIdea.teamSize'));
  var createIdeaButton = element(by.buttonText('Create Idea'));
  var newIdeaButton = element(by.buttonText('Add Idea'));
  var cancelIdeaButton = element(by.buttonText('Cancel'));
  var showIdeaButton = element(by.buttonText('Show Ideas'));
  var users = element.all(by.repeater('studentctrl.students'));
  var ideas = element.all(by.repeater('student.ideas'));
  var ideaName = element(by.model('idea.sector'));


  beforeEach(function() {
    browser.get('http://localhost:8080');
  })

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Ideas');
    expect(element(by.id('create')).isPresent())
  })

  it('should create a new student', () => {
    name.sendKeys('Test');
    password.sendKeys('password')
    track.sendKeys('Java')
    newStudentButton.click();
    users.then(function(user) {
      expect(user[user.length -1].element(by.binding('student.name')).getText()).toEqual('Username: Test')
    })
  })


  it('should create a new idea', () => {
    users.then(function(user) {
      user[user.length -1].element(by.buttonText('Create Idea')).click()
            sector.sendKeys('Test Idea')
            lang.sendKeys('Java')
            teamSize.sendKeys(5)
            newIdeaButton.click();
            cancelIdeaButton.click();
            user[user.length -1].element(by.buttonText('Show Ideas')).click();
            expect(ideas.last().element(by.binding('idea.sector')).getText()).toBe('Sector: Test Idea');
    })
  })

  it('should update idea', () => {
    users.last().element(by.buttonText('Show Ideas')).click();
    ideas.last().element(by.buttonText('Edit Idea')).click()
    ideas.last().element(by.model('idea.sector')).clear();
    ideas.last().element(by.model('idea.sector')).sendKeys('Test')
    ideas.last().element(by.buttonText('Update Idea')).click()
    expect(ideas.last().element(by.binding('idea.sector')).getText()).toBe('Sector: Test')
  })

  it('should delete idea', () => {
    users.then(function(user) {
      user[user.length -1].element(by.buttonText('Show Ideas')).click()
            element(by.buttonText('Delete Idea')).click()
            expect(ideas).toEqual([]);
    })
  })

  it('should update a student', () => {
    users.last().element(by.buttonText('Edit Student')).click();
    users.last().element(by.model('student.name')).clear()
    users.last().element(by.model('student.name')).sendKeys('Test2')
    users.last().element(by.buttonText('Update Student')).click();
    expect(users.last().element(by.binding('student.name')).getText()).toBe('Username: Test2')
  })

  it('should delete a student', () => {
    users.then(function(user) {
      users.last().element(by.buttonText('Delete Student')).click()
      expect(users.last().element(by.binding('student.name')).getText()).toBe('Username: Shumye')
    })
  })
})
