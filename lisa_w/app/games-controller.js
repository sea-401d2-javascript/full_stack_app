
'use strict';

module.exports = (app) => {

app.controller('GameController', ['$scope','$http', function($scope, $http){
  console.log('marker 1');
  const gameRoute = 'http://localhost:5000/games';
  this.games = ['game'];
  this.newGame = {};
  this.cancelGame = {};
  this.editorOn = false;

  this.getGames = function(){
    $http.get(gameRoute)
    .then((result)=>{
      this.games = result.data.games;
    }, function(error){
      console.log(error);
    });
  };
  this.createGame = function(game){
    $http.post(gameRoute, game)
    .then((res)=>{
      console.log(res.data);
      this.games.push(res.data);
    });
  };
  this.removeGame = function(game) {
    $http.delete(gameRoute + '/' + game._id)
    .then((res)=>{
      this.games = this.games.filter((g)=> g._id !=game._id);
    });
  };

    this.showEdit = function(){
      this.editorOn = true;
      this.editGame = this.games;
      this.editGameTitle = this.games.title;
      this.editGameGenre = this.games.genre;
      this.editGameHours = this.arcades.hours;
    };

    this.hideEdit = function(){
      this.editorOn = false;
      // this.editArcade = this.arcades;
    };

    this.saveEdit = function(){
      this.arcades.name = this.editArcadeName;
      this.arcades.address = this.editArcadeAddress;
      this.arcades.hours = this.editArcadeAHours;
      this.hideEdit();
    };


  this.updateArcade = function(arcadeEdit){
    $http.put(arcadeRoute + '/' + arcadeEdit._id, arcadeEdit)
    .then((res)=>{
      this.arcades = this.arcades.map((a) =>{
        if(a._id === arcadeEdit._id){
          return arcadeEdit;
        } else {
          return a;
        }
      });
    });
  };
  // this.cancelUpdate = function(){
  //   // arcadeEdit = this.arcades;
  //   this.editArcadeName = this.arcades.name;
  //   this.editArcadeAddress = this.arcades.address;
  //   this.editArcadeAHours = this.arcades.hours;
  // };
}]);
};
