'use strict';

module.exports = (apiRouter) => {
  let Friend = require(__dirname + '/../models/friend-model');

  apiRouter.route('/friends')
    .get((req, res) => {
      Friend.find({}, (err, friends) => {
        res.json({data: friends});
        res.end();
      });
    })
    .post((req, res) => {
      var newFriend = new Friend(req.body);
      newFriend.save((err, friend) => {
        res.json(friend);
        res.end();
      });
    });

  apiRouter.route('/friends/:id')
  .get((req, res) => {
    Friend.findById(req.params.id, (err, friend) => {
      res.json(friend);
      res.end();
    });
  })
    .put((req, res) => {
      Friend.findByIdAndUpdate(req.params.id,{ $set: req.body }, (err, ghost) => {
        if (err) res.end(err);
        res.json(ghost);
      });
    })
      .delete((req, res) => {
        Friend.findById(req.params.id, (err, friend) => {
          friend.remove(() => {
            res.send('FRIENDSHIP OVER');
            res.end();
          });
        });
      });

  apiRouter.route('/howmanyteethdomyfriendshavecollectively')
    .get((req, res) => {
      Friend.find({}, (err, friends) =>{
        var teeth = 0;
        var counter = 0;
        friends.forEach((friend) => {
          teeth+=friend.numTeeth;
          counter++;
          if(counter === friends.length){
            res.send('Altogether your '+counter+' friends have '+teeth+' teeth');
            res.end();
          }
        });
      });
    });
};
