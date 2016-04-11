'use strict';


module.exports = (mongoose, models) => {
  let Schema = mongoose.Schema;
  let ArcadeSchema = new Schema({
    name: String,
    address: String,
    updated: {type: Date, default: Date.now },
    games: [{
      type: Schema.Types.ObjectId,
      ref: 'Game'
    }
    ]

  });
  var Arcade = mongoose.model('Arcade', ArcadeSchema);
  models.Arcade = Arcade;
};
