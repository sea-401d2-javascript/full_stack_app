describe('end to end testing', function() {

  describe('speciess testing', function() {
    var resource = element(by.binding('speciessCtrl.resource'));
    var speciessRepeater = element.all(by.repeater('species in speciessCtrl.speciess')); //by.repeater('species in speciessCtrl.speciess');

    beforeEach(function() {
      browser.get('http://localhost:8080');
    });

    it('have correct resource', function() {
      expect(resource.getText()).toEqual('speciess'.toUpperCase());
    });

    it('species have column genus', function() {
      var species0 = element.all(by.repeater('species in speciessCtrl.speciess').column('species.genus')).getText();
      species0.then(function(genera) {
        genera.forEach(function(genus) {
          expect(genus).toBeDefined();
        });
      });
    });

  });

});
