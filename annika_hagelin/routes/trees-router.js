'use strict';
const jwtAuth = require(__dirname+'/../lib/jwt_auth.js');
module.exports = (router, models) => {
// const express = require('express');
// const router = module.exports = new express.Router();
// let Tree = require(__dirname+'/../models/tree-model.js');
  let Tree = models.Tree;

  router.route('/trees')
  .get(jwtAuth, (req, res) => {
    Tree.find({})
    .populate('species')
    .exec((err, trees) => {
      if (err) return res.sendStatus(500);
      return res.status(200).send(trees);
    });

  })
  .post(jwtAuth, (req, res) => {
    console.log(req.body.species);
    var newTree = new Tree(req.body);
    newTree.save((err, tree) => {
      if (err) {
        console.log(err);
        return res.status(500).send('error creating tree');
      }
      Tree.populate(tree, {path:"species"}, (err, tree) => {
        if (err) { res.status(500).json({msg: 'error populating tree', err:err}); return console.log(err); }
        return res.status(200).json(tree);
      })
    });


  });

  router.route('/trees/:id')
  .get(jwtAuth, (req, res) => {
    Tree.findById(req.params.id)
    .populate('species')
    .exec((err, tree) => {
      if (err) return res.sendStatus(500);
      return res.status(200).send(tree);
    });
  })
  .put(jwtAuth, (req, res) => {
    Tree.findByIdAndUpdate(req.params.id, req.body, (err, tree) => {
      if (err) return res.status(500).send('error updating tree with id '+req.params.id).end();
      return res.status(200).json(tree).end();
    });
  })
  .delete(jwtAuth, (req, res) => {
    Tree.findByIdAndRemove(req.params.id, (err) => {
      if (err) return res.status(500).send('error deleting tree with id '+req.params.id);
      return res.sendStatus(200);
    });
  });
}
