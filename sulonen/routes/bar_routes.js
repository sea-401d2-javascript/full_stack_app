'use strict';

let parser = require('body-parser');
let Bar = require('./../models/bar_model');
let handleDBError = require('./../lib/handle_db_error');
let jwtAuth = require('./../lib/jwt_auth');

module.exports = (router) => {
  router.use(parser.json());

  router.route('/bars')
    .get((req, res) => {
      Bar.find({}, (err, bars) => {
        if (err) return console.log(err);
        res.json({data: bars});
      });
    })

    .post((req, res) => {
      var newBar = new Bar(req.body);
      newBar.save((err, bar) => {
        if (err) return console.log(err);
        res.json(bar);
      });
    });

  router.route('/bars/:id')
    .get((req, res) => {
      Bar.findById(req.params.id, (err, bar) => {
        if (err) return console.log(err);
        res.json(bar);
      });
    })

    .put((req, res) => {
      Bar.findByIdAndUpdate(req.params.id, req.body, (err) => {
        if (err) return console.log(err);
        res.json({msg: 'success'});
      });
    })

    .delete((req, res) => {
      Bar.findById(req.params.id, (err, bar) => {
        bar.remove((err) => {
          if (err) return console.log(err);
          res.json({msg: 'bar removed'});
        });
      });
    });
};
