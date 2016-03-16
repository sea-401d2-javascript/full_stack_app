'use strict';

module.exports = (apiRouter) => {

  let Ghost = require(__dirname + '/../models/ghost-model');

  apiRouter.route('/ghosts')
    .get((req, res) => {
      Ghost.find({}, (err, ghosts) => {
        res.json({data: ghosts});
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

  apiRouter.route('/ghosts/:id')
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
};
