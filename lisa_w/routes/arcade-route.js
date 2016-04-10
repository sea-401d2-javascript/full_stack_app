'use strict';
// var bodyParser = require('body-parser');

module.exports = (router, models)=>{
  let Arcade = models.Arcade;

  router.route('/arcades')
   .post((req, res)=>{
     console.log('post was hit');
     var newArcade = new Arcade(req.body);
     newArcade.save((err, arcade)=>{
       if (err) res.send(err);
       res.json({data: arcade});
     });

   })
   .get((req, res) =>{
     console.log('get was hit');
     Arcade.find({}, (err, arcades)=>{
       if(err)  res.send(err);
       console.log('hit ' + arcades);
       res.json({data: arcades});
     });
   });
  router.route('/arcades/:id')
   .get((req, res)=>{
     console.log(('GET /arcade/:id was hit'));
     Arcade.findById(req.params.id, (err, arcade)=>{
       if (err) res.send(err);
       res.json(arcade);
      //  console.log(arcade);
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
