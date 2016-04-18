'use strict';

// let mongoose = require('mongoose');
module.exports = (mongoose, models)=>{
  let Schema = mongoose.Schema;
  let GamesSchema = new Schema({
    title: String,
    genre: String,
    year: Number,
    highScore: Number,
    updated: {type: Date, default: Date.now},
    players: Number

  });

  let Game = mongoose.model('Game', GamesSchema);
  models.Game = Game;
};
