// const controllers = require(__dirname + '/app/index.js');

describe('e2e testing on my homepage -continents', function(){
  var countryForm;
  var regionForm;
  var mineralForm;
  var buttonClicker;
  var pCountry;
  var pRegion;
  var pMineral;

  beforeEach(function(){
      browser.get('http://127.0.0.1:8080/');
      countryForm = element(by.model('conts.newConts.country'));
      regionForm = element(by.model('conts.newConts.region'));
      mineralForm = element(by.model('conts.newConts.mineral'));
      buttonClicker = element(by.buttonText('Create New Continents!'));

      pCountry = element(by.binding('conts.newConts.country'));
      pRegion = element(by.binding('conts.newConts.region'));
      pMineral = element(by.binding('conts.newConts.mineral'));

      countryForm.clear();
      countryForm.sendKeys('Japan');
      regionForm.clear();
      regionForm.sendKeys('Osaka');
      mineralForm.clear();
      mineralForm.sendKeys('coal');
  });

  it('should have the correct title', function(){
    expect(browser.getTitle()).toEqual('Full Stack App');
  });

  it('forms should take data input', function(){
    expect(countryForm.getAttribute('value')).toEqual('Japan');
    expect(regionForm.getAttribute('value')).toEqual('Osaka');
    expect(mineralForm.getAttribute('value')).toEqual('coal');
  });

  it('should have p tag that has the same data as input models', function(){
    expect(pCountry.getText('value')).toEqual('Japan');
    expect(pRegion.getText('value')).toEqual('Osaka');
    expect(pMineral.getText('value')).toEqual('coal');
  });

  it('should submit the data being input by clicking the button', function(){
    var form = element(by.tagName('form'));
    buttonClicker.click();

    expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8080/');
    expect(countryForm.getText('value')).toEqual('');
    expect(regionForm.getText('value')).toEqual('');
    expect(mineralForm.getText('value')).toEqual('');
  });

  it('should show search by id button when field is input', function(){
    editPId = element(by.model('conts.id'));
    editPCountry = element(by.model('conts.getCont.country'));
    editPRegion = element(by.model('conts.getCont.country'));
    editPMineral = element(by.model('conts.getCont.mineral'));
    searchButton = element(by.buttonText('Search Continent by Id'));
    editPId.sendKeys('12345');
    searchButton.click();
    expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8080/');
    expect(editPId.isDisplayed()).toBe(true);
  });
});

describe('e2e testing on my homepage -continents', function(){
  var nameForm;
  var colorForm;
  var densityForm;
  var buttonClicker;
  var pName;
  var pColor;
  var pDensity;
  beforeEach(function(){
    browser.get('http://127.0.0.1:8080/');
    nameForm = element(by.model('gems.newGem.name'));
    colorForm = element(by.model('gems.newGem.color'));
    densityForm = element(by.model('gems.newGem.density'));
    buttonClicker = element(by.buttonText('Create New Gem!'));

    pName = element(by.binding('gems.newGem.name'));
    pColor = element(by.binding('gems.newGem.color'));
    pDensity = element(by.binding('gems.newGem.density'));

    nameForm.clear();
    nameForm.sendKeys('Ruby');
    colorForm.clear();
    colorForm.sendKeys('red');
    densityForm.clear();
    densityForm.sendKeys(5);
  });

  it('forms should take data input', function(){
    expect(nameForm.getAttribute('value')).toEqual('Ruby');
    expect(colorForm.getAttribute('value')).toEqual('red');
    expect(densityForm.getAttribute('value')).toEqual('5');
  });

  it('should have p tag that has the same data as input models', function(){
    expect(pName.getText('value')).toEqual('Ruby');
    expect(pColor.getText('value')).toEqual('red');
    expect(pDensity.getText('value')).toEqual('5');
  });

  it('should submit the data being input by clicking the button', function(){
    var form = element(by.tagName('form'));
    buttonClicker.click();

    expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8080/');
    expect(nameForm.getText('value')).toEqual('');
    expect(colorForm.getText('value')).toEqual('');
    expect(densityForm.getText('value')).toEqual('');
  });

  it('should show search by id button when field is input', function(){
    editPId = element(by.model('gems.id'));
    editPName = element(by.model('gems.newGem.name'));
    editPColor = element(by.model('gems.newGem.color'));
    editPDensity = element(by.model('gems.newGem.density'));
    searchButton = element(by.buttonText('Search Gem by Id'));
    editPId.sendKeys('12345');
    searchButton.click();
    expect(browser.getCurrentUrl()).toBe('http://127.0.0.1:8080/');
    expect(editPId.isDisplayed()).toBe(true);
  });
});
