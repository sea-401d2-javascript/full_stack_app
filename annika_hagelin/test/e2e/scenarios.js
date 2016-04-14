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

    it('can update species', function() {
      element.all(by.repeater('species in speciessCtrl.speciess'))
        .then(function(species) {
          species[0].element(by.buttonText('update')).click()
            .then(function() {
              species[0].element(by.buttonText('ok')).isDisplayed()
                .then(function(isDisplayed) {
                  expect(isDisplayed).toBe(true);
                });
            });
        });

    });



  });

});
