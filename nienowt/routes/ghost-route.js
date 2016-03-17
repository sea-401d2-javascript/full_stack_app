'use strict';

module.exports = (router) => {

  let Ghost = require(__dirname + '/../models/ghost-model');
  let Powers = require(__dirname + '/../models/powers-model');

  router.route('/ghosts')
    .get((req, res) => {
      Ghost.find({})
        .populate('powers')
        .exec((err, ghosts) => {
          res.json(ghosts);
          res.end();
        });
    })
      .post((req, res) => {
        var newPowers = new Powers(req.body.powers);
        newPowers.save((err) => {
          if (err) res.send('powers not recieved yo');
          var newGhost = new Ghost({
            name: req.body.name,
            isEvil: req.body.isEvil,
            numEyes: req.body.numEyes,
            powers: newPowers._id
          });
          newGhost.save((err, ghost) => {
            res.json(ghost);
            res.end();
          });
        });
      });

  router.route('/ghosts/:id')
  .get((req, res) => {
    Ghost
    .findOne({_id: req.params.id})
    .populate('powers')
    .exec((err, ghost) => {
      res.json(ghost);
      res.end();
    });
  })
    .put((req, res) => {
      Ghost.findByIdAndUpdate(req.params.id,{ $set: req.body.ghost }, (err, ghost) => {
        if (err) res.end(err);
        Powers.findByIdAndUpdate(ghost.powers, { $set: req.body.powers}, (err) =>{
          if (err) res.send(err);
          console.log('powers stored');
        });
        res.write('Ghost updated!');
        res.end();
      });
    })
      .delete((req, res) => {
        Ghost.findById(req.params.id, (err, ghost) => {
          Powers.findById(ghost.powers, (err, power) =>{
            if (err) res.send('oh no');
            power.remove(() =>{
              console.log('Powers gone');
            });
          });
          ghost.remove(() => {
            res.send('GHOST BUSTED');
          });
        });
      });

  router.route('/coolghosts')
    .get((req, res) => {
      var stream = Ghost.where('isEvil').ne(true).stream();
      var ghosts = '';
      stream.on('data', (doc) => {
        ghosts += doc.name + ' ';
      }).on('end', ()=> {
        res.write('These ghosts are guaranteed to be pretty good ghosts: '+ghosts);
        res.end();
      });
    });

  router.route('/ghosteyes')
    .get((req, res) => {
      Ghost.aggregate([
          {$group: {_id: '$isEvil', average: {$avg: '$numEyes'}}}
      ],(err, result) => {
        res.write('Our Evil ghosts, on average, have '+ result[0].average + ' eyes, while our non-evil ghosts average '+ result[1].average + ' eyes');
        res.end();
      });
    });
};
