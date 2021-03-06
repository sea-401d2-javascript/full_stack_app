'use strict';

module.exports = (GemRouter, Gem)=>{

  GemRouter.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Somthing broke');
    next();
  });

  GemRouter.use((req, res, next)=>{
    console.log('Time : ' + new Date());
    next();
  });

  GemRouter.get('/gems', (req, res)=>{
    Gem.find({}, (err,gem)=>{
      if(err){
        res.json({msg: 'Oops, there is an error.' + err});
      }
      res.json(gem);
    });
  });

  GemRouter.get('/gems/:id', (req, res)=>{
    Gem.findById(req.params.id, (err, gem)=>{
      res.json(gem);
    });
  });

  //**************************
  //querying density Number
  //**************************
  GemRouter.get('/density/', (req, res)=>{
    var num = JSON.parse(req.query.density);
    Gem.find({'density': {$lte: num }}, (err, gem)=>{
      res.json(gem);
      res.end();
    });
  });

  GemRouter.post('/gems', (req, res)=>{
    var newGem = new Gem(req.body);
    newGem.save((err, gem)=>{
      res.json(gem);
    });
  });


  GemRouter.put('/gems/:id', (req, res)=>{
    var query = {_id: req.params.id };
    Gem.update(query, req.body, (err, gem)=>{
      res.json({_id: gem});
    });
  });


  GemRouter.delete('/gems/:id',(req, res)=>{
    var query = {_id: req.params.id };
    Gem.remove(query, ()=>{
      res.json({msg: 'Requested object has been removed from db.'});
    });
  });

};
