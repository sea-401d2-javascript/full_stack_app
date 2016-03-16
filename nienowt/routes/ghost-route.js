'use strict';

module.exports = (router) => {

  let Ghost = require(__dirname + '/../models/ghost-model');

  router.route('/ghosts')
    .get((req, res) => {
      Ghost.find({}, (err, ghosts) => {
        res.json(ghosts);
        res.end();
      });
    })
      .post((req, res) => {
        var newGhost = new Ghost(req.body);
        newGhost.save((err, ghost) => {
          res.json(ghost);
          res.end();
        });
      });

  router.route('/ghosts/:id')
  .get((req, res) => {
    Ghost.findById(req.params.id, (err, ghost) => {
      res.json(ghost);
      res.end();
    });
  })
    .put((req, res) => {
      Ghost.findByIdAndUpdate(req.params.id,{ $set: req.body }, (err, ghost) => {
        if (err) res.end(err);
        res.json(ghost);
      });
    })
      .delete((req, res) => {
        Ghost.findById(req.params.id, (err, ghost) => {
          ghost.remove(() => {
            res.send('GHOST ELIMINATED');
          });
        });
      });

  router.route('/coolghosts')
    .get((req, res) => {
      var stream = Ghost.where('isEvil').ne(true).stream();
      var ghosts = [];
      stream.on('data', (doc) => {
        ghosts.push(doc.name);
      }).on('end', ()=> {
        res.send('This ghosts are guaranteed to be pretty good ghosts: '+ghosts);
        res.end();
      });
    });

  router.route('/ghosteyes')
    .get((req, res) => {
      Ghost.aggregate([
          {$group: {_id: '$isEvil', average: {$avg: "$numEyes"}}}
        ],(err, result) => {
          res.send('Our ghosts, on average, have '+(result[0].average + result[1].average) / 2 + ' eyes')
          res.end();
        })
    });
};
