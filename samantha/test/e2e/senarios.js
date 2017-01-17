// start all servers (client-server and server) in terminal
// along with mongod (for testdb) and selenium 

process.env.MONGOLAB_URI = 'mongodb://localhost/testdb';

// require(__dirname + '/../../server.js');

describe('first e2e tests for full stack angular app', function(){

  beforeEach(function() {
    // browser.get('http://127.0.0.1:8080');
    browser.get('http://localhost:8080')
  });

  it('should have a correct title', function(){
    expect(browser.getTitle()).toEqual('Chef and Recipe full stack angular app');
  });

  it('should make a chef', function(){

    var chefs = element.all(by.repeater('chef in chefctrl.chefs'));
    var name = element(by.model('newChef.name'));
    var password = element(by.model('newChef.password'));
    var funFact = element(by.model('newChef.funFact'));
    var button = element(by.buttonText('Add New Chef'));

    name.clear();
    name.sendKeys('Rachel');
    password.clear();
    password.sendKeys('password');
    funFact.clear();
    funFact.sendKeys('loves js');
    button.click();
    expect(name.getAttribute('value')).toEqual('Rachel');
    expect(password.getAttribute('value')).toEqual('password');
    expect(funFact.getAttribute('value')).toEqual('loves js');
    expect(chefs.get(0).getText()).toContain('Rachel');
    expect(chefs.get(0).getText()).toContain('password');
    expect(chefs.get(0).getText()).toContain('loves js');
  });

  it('should add a new recipe', function() {

    var recipes = element.all(by.repeater('recipe in recipectrl.recipes'));
    var name = element(by.model('newRecipe.name'));
    var cookTime = element(by.model('newRecipe.cookTime'));
    var ingredients = element(by.model('newRecipe.ingredients'));
    // console.log(ingredients)
    var button = element(by.buttonText('Add New Recipe'));

    name.clear();
    name.sendKeys('Brownies');
    cookTime.clear();
    cookTime.sendKeys(30);
    ingredients.clear();
    ingredients.sendKeys('chocolate');
    button.click();

    expect(name.getAttribute('value')).toEqual('Brownies');
    expect(cookTime.getAttribute('value')).toEqual('30');
    expect(ingredients.getAttribute('value')).toEqual('chocolate');
    expect(recipes.get(0).getText()).toContain('Brownies');
    expect(recipes.get(0).getText()).toContain('30');
    expect(recipes.get(0).getText()).toContain('chocolate');
  });

});
