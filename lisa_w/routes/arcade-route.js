'use strict';

module.exports = (router, models)=>{
  let Arcade = models.Arcade;

  router.route('/arcades')
  .get((req, res) =>{
    console.log('get was hit');
    Arcade.find({}, (err, arcades)=>{
      if(err)  return res.send(err);
      res.json({arcades});
      res.end();
    });
  })
   .post((req, res)=>{
     console.log('post was hit');
     var newArcade = new Arcade(req.body);
     newArcade.save((err, arcade)=>{
       if (err) return res.send(err);
       res.json(arcade);
       res.end();
     });

   });
  router.route('/arcades/:id')
   .get((req, res)=>{
     console.log(('GET /arcade/:id was hit'));
     Arcade.findById(req.params.id, (err, arcade)=>{
       if (err) return res.send(err);
       res.json(arcade);
     });
   })
   .put((req, res)=>{
     console.log('PUT /arcade/:id was hit');
     Arcade.findByIdAndUpdate(req.params.id, req.body,(err, arcade)=>{
       if (err) res.send(err);
       res.json(arcade);
     });
   })
    .delete((req, res)=> {
      console.log('Delete /arcade/:id was hit');
      Arcade.remove({_id: req.params.id}, (err, arcade)=> {
        if(err) return res.send(err);
        res.json({
          data: arcade,
          msg: 'sucessfully deleted arcade'});
      });
    });


  router.route('/arcade-names')
    .get((req, res)=>{
      var nameArray = [];
      Arcade.find({}, (err, arcades)=>{
        arcades.forEach((arcade)=> {
          nameArray.push(arcade.name);
        });
        if (err) res.send(err);
        res.json({nameArray});
      });
    });

};
