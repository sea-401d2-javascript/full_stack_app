(function(){
  angular.module('human')
  .controller('HumanController', ['$http', function($http) {
    const mainRoute = 'http://localhost:3000/api/humans';
    this.humans = ['human'];
    this.editShow = 'new';
    this.newHuman = {};
    this.editconfirmation;
    this.changedHuman = {};
    this.toggle = function(name){
      if (this.editShow !== 'new') return this.editShow = 'new';
      this.editShow = name;
    };
    this.confirmChange = function(human, buttonName, curHuman){
      if (!this.editConfirmation) return this.editConfirmation = true;
      if(buttonName === 'delete') return this.removeHuman(human);
      if(buttonName === 'edit') return this.editHuman(human, curHuman);
    };

    this.getHumans = function() {
      $http.get(mainRoute)
      .then((results) => {
        console.log(results);
        this.humans = results.data;
        console.log(results.data);
      },(err) => {
        if (err) console.log(err);
      });
    };
    this.createHuman = function(human) {
      $http.post(mainRoute, human)
      .then(() => {
        this.humans.push(human);
        this.newHuman = {};
      });
    };
    this.editHuman = function(changedHuman, human){
      $http.put(mainRoute + '/' + human._id, changedHuman)
      .then(() => {
        this.humans = this.humans.filter((g) => g._id != human._id);
        this.humans.push(changedHuman);
      });
    };
    this.removeHuman = function(human){
      $http.delete(mainRoute + '/' + human._id)
      .then(() => {
        this.humans = this.humans.filter((g) => g._id != human._id);
      });
    };
    this.reset = function(){
      this.editShow = 'new';
      this.changedHuman = {};
      this.editConfirmation = false;
    };
  }]);
})()
