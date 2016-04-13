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
    // expect(countryForm.getAttribute('value')).toEqual('null');
    // expect(regionForm.getAttribute('value')).toEqual('null');
    // expect(mineralForm.getAttribute('value')).toEqual('null');
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
    nameForm.sendKeys('red');
    densityForm.clear();
    nameForm.sendKeys(5);
  });

  it('should take text and number')
});
