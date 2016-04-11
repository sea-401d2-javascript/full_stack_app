'use strict';

module.exports = (ContRouter, Continent)=>{

  ContRouter.get('/continents', (req, res)=>{
    Continent.find({}, (err, continent)=>{
      res.json(continent);
    });
  });

  ContRouter.get('/continents/:id', (req, res)=>{
    var query = {_id: req.params.id};
    Continent.findOne(query, (err, continent)=>{
      res.json(continent);
    });
  });

  //*****************************************
  //populating gem data inside of continent
  //*****************************************
  ContRouter.get('/populate/:id',(req, res)=>{
    var query = {_id: req.params.id};
    Continent.findOne(query).populate('gems').exec((err, continent)=>{
      res.json({id: continent});
    });
  });

  ContRouter.post('/continents', (req, res)=>{
    console.dir('REQ.BODY : ' + JSON.stringify(req.body));
    var newContinent = new Continent(req.body);
    newContinent.save((err, continent)=>{
      if(err){
        res.json({msg: err});
        return;
      }
      res.json(continent);
    });
  });

  ContRouter.put('/continents/:id', (req, res)=>{
    var query = { _id: req.params.id};
    Continent.update(query, req.body, (err, continent)=>{
      res.json(continent);
      res.end();
    });
  });

  ContRouter.delete('/continents/:id',(req, res)=>{
    var query = {_id: req.params.id};
    Continent.remove(query, (data)=>{
      console.log('This is hit : ' + data);
      res.json({msg: 'requested continent has been removed.'});
    });
  });

};
