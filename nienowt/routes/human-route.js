'use strict';

module.exports = (router) => {
  let Human = require(__dirname + '/../models/human-model');

  router.route('/humans')
    .get((req, res) => {
      Human.find({}, (err, humans) => {
        res.json({data: humans});
        res.end();
      });
    })
    .post((req, res) => {
      var newHuman = new Human(req.body);
      newHuman.save((err, human) => {
        res.json(human);
        res.end();
      });
    });

  router.route('/humans/:id')
  .get((req, res) => {
    Human.findById(req.params.id, (err, human) => {
      res.json(human);
      res.end();
    });
  })
    .put((req, res) => {
      Human.findByIdAndUpdate(req.params.id,{ $set: req.body }, (err, ghost) => {
        if (err) res.end(err);
        res.json(ghost);
      });
    })
      .delete((req, res) => {
        Human.findById(req.params.id, (err, human) => {
          human.remove(() => {
            res.send('HUMAN ELIMINATED');
            res.end();
          });
        });
      });

  router.route('/howmanyteethdothehumanshavecollectively')
    .get((req, res) => {
      Human.find({}, (err, humans) =>{
        var teeth = 0;
        var counter = 0;
        humans.forEach((human) => {
          teeth+=human.numTeeth;
          counter++;
          if(counter === humans.length){
            res.send('Altogether the '+counter+' humans have '+teeth+' teeth');
            res.end();
          }
        });
      });
    });

  router.route('/howmanyofthesehumansarecool')
  .get((req,res) => {
    Human.find({}, (err, humans) =>{
      var cool = 0;
      var counter = 0;
      humans.forEach((human) => {
        if(human.isCool) {
          cool++
        }
        counter++;
        if(counter === humans.length){
          var avg = cool / counter
          res.send(cool+' out of '+counter+' humans are cool, which means altogether humans are ' +avg.toFixed(2) * 100 + '% cool');
          res.end();
        }
      });
    });
  })
};
