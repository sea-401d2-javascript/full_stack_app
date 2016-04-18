'use strict';

describe('E2E tests for fullstack application', function() {
  let barName = element(by.model('bar.name'));
  let barNeighborhood = element(by.model('bar.neighborhood'));
  let barHours = element(by.model('bar.hours'));
  let barEditButton = $('.bar-edit');
  let barCreateButton = $('.bar-create');
  let barSaveButton = $('.bar-save');
  let barDeleteButton = $('.bar-delete');

  let bandName = element(by.model('band.name'));
  let bandCity = element(by.model('band.city'));
  let bandCountry = element(by.model('band.country'));
  let bandGenre = element(by.model('band.genre'));
  let bandBar = element(by.model('band.bar'));
  let bandEditButton = $('.band-edit');
  let bandCreateButton = $('.band-create');
  let bandSaveButton = $('.band-save');
  let bandDeleteButton = $('.band-delete');

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080/');
  });

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('REST Client');
  });
  
  // bars
  it('should provide a default bar', function() {
    expect(barName.getAttribute('value')).toEqual('Create a new bar!');
    barEditButton.click();
    expect(barNeighborhood.getAttribute('value')).toEqual('');
    expect(barHours.getAttribute('value')).toEqual('');
  });

  it('should create a bar', function() {
    barEditButton.click();
    barName.clear();
    barName.sendKeys('Hattie\'s Hat');
    barNeighborhood.clear();
    barNeighborhood.sendKeys('Ballard');
    barHours.clear();
    barHours.sendKeys('11am - 3am');
    barCreateButton.click();
    expect(barName.getAttribute('value')).toEqual('Hattie\'s Hat');
  });

  it('should update a bar', function() {
    barEditButton.click();
    barName.clear();
    barName.sendKeys('Tractor Tavern');
    barNeighborhood.clear();
    barNeighborhood.sendKeys('Ballard');
    barHours.clear();
    barHours.sendKeys('4pm - 3am');
    barSaveButton.click();
    expect(barName.getAttribute('value')).toEqual('Tractor Tavern');
  });

  it('should delete a bar', function() {
    barEditButton.click();
    barDeleteButton.click();
    expect(barName.getAttribute('value')).toEqual('Create a new bar!');
  });

  // bands 
  it('should provide a default band', function() {
    expect(bandName.getAttribute('value')).toEqual('Create a new band!');
    bandEditButton.click();
    expect(bandCity.getAttribute('value')).toEqual('');
    expect(bandCountry.getAttribute('value')).toEqual('');
    expect(bandGenre.getAttribute('value')).toEqual('');
    expect(bandBar.getAttribute('value')).toEqual('');
  });

  it('should create a band', function() {
    bandEditButton.click();
    bandName.clear();
    bandName.sendKeys('Wardruna');
    bandCity.clear();
    bandCity.sendKeys('Bergen');
    bandCountry.clear();
    bandCountry.sendKeys('Norway');
    bandGenre.clear();
    bandGenre.sendKeys('Special Project');
    bandBar.clear();
    bandBar.sendKeys('Hattie\'s Hat');
    bandCreateButton.click();
    expect(bandName.getAttribute('value')).toEqual('Wardruna');
  });

  it('should update a band', function() {
    bandEditButton.click();
    bandName.clear();
    bandName.sendKeys('Gorgoroth');
    bandCity.clear();
    bandCity.sendKeys('Bergen');
    bandCountry.clear();
    bandCountry.sendKeys('Norway');
    bandGenre.clear();
    bandGenre.sendKeys('Black Metal');
    bandBar.clear();
    bandBar.sendKeys('Tractor Tavern');
    bandSaveButton.click();
    expect(bandName.getAttribute('value')).toEqual('Gorgoroth');
  });

  it('should delete a band', function() {
    bandEditButton.click();
    bandDeleteButton.click();
    expect(bandName.getAttribute('value')).toEqual('Create a new band!');
  });
});
