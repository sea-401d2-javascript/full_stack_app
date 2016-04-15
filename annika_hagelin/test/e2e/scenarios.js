describe('end to end testing', function() {

  describe('speciess testing', function() {
    var resource = element(by.binding('speciessCtrl.resource'));

    beforeEach(function() {
      browser.get('http://localhost:8080');
    });

    it('have correct resource', function() {
      expect(resource.getText()).toEqual('speciess'.toUpperCase());
    });

    it('species have column genus', function() {
      element.all(by.repeater('species in speciessCtrl.speciess').column('species.genus')).getText()
        .then(function(genera) {
          genera.forEach(function(genus) {
            expect(genus).toBeDefined();
          });
        });
    });

    it('cancel update species', function() {
      element.all(by.repeater('species in speciessCtrl.speciess'))
        .then(function(species) {
          species[0].element(by.buttonText('update')).click();
          expect(species[0].element(by.buttonText('ok')).isDisplayed()).toBe(true);

          var originalSpecies = {
            genus: species[0].element(by.model('species.genus')).getAttribute('value'),
            species: species[0].element(by.model('species.species')).getAttribute('value'),
            cmnName: species[0].element(by.model('species.cmnName')).getAttribute('value')
          };

          species[0].element(by.model('species.genus')).clear().sendKeys('updatadus');
          species[0].element(by.model('species.species')).clear().sendKeys('miga');
          species[0].element(by.model('species.cmnName')).clear().sendKeys('updated me');

          expect(species[0].element(by.binding('species.cmnName')).getText()).toBe('updated me');

          species[0].element(by.buttonText('cancel')).click();

          element.all(by.repeater('species in speciessCtrl.speciess'))
            .then(function(species) {
              expect(species[0].element(by.model('species.cmnName')).getAttribute('value')).toBe(originalSpecies.cmnName);

            });

        });
    });

    it('create species', function() {
      var createForm = $('#speciess').$('#create-species');
      createForm.element(by.model('species.genus')).clear().sendKeys('mcgardius');
      createForm.element(by.model('species.species')).clear().sendKeys('hildica');
      createForm.element(by.model('species.cmnName')).clear().sendKeys('hilda mcgard');
      createForm.element(by.buttonText('create species')).click()
        .then(function() {
          element.all(by.repeater('species in speciessCtrl.speciess').column('species.species')).getText()
            .then(function(speciess) {
              var newSpecies = speciess[speciess.length-1];
              expect(newSpecies).toBe('mcgardius hildica')
            });
        });
    });

    it('delete last species', function() {
      element.all(by.repeater('species in speciessCtrl.speciess'))
        .then(function(speciess) {
          var  nSpecies = speciess.length;
          var deleteMe = speciess[speciess.length-1];
          deleteMe.element(by.buttonText('delete')).click();
          element.all(by.repeater('species in speciessCtrl.speciess'))
            .then(function(speciess) {
              expect(speciess.length).toBe(nSpecies-1);
            });
        })

    });



  });

});
