'use strict'

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');
let Ghost = require(__dirname + '/../models/ghost-model');
let Powers = require(__dirname + '/../models/powers-model');

describe('rest with mongo', () => {
  var ghostId;
  before((done) => {
    Ghost.remove({},(err) => {
      if (err) console.log('err: ' + err);
      console.log('ghosts cleared')
      done();
    })
  })
  it('should store new ghost', (done) => {
    request('localhost:3000')
    .post('/ghosts')
    .send({"name":"BORTET","isEvil":"true","numEyes":"164", "powers":{"primary":"murder"}})
    .end((err, res) =>{
      Ghost
      .findOne({_id: res.body._id})
      .populate('powers')
      .exec((err, ghost) => {
        expect(err).to.eql(null)
        expect(ghost.name).to.eql('BORTET')
        expect(ghost.powers[0].primary).to.eql('murder')
        expect(ghost.numEyes).to.eql(164)
        ghostId = ghost._id;
        done();
      });
    })
  })
  it('should get ghosts', (done) => {
    request('localhost:3000')
    .get('/ghosts')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body[0].name).to.eql('BORTET');
      expect(res.body[0].numEyes).to.eql(164);
      done();
    })
  })
  it('should get one ghost', (done) => {
    request('localhost:3000')
    .get('/ghosts/' + ghostId)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('BORTET');
      expect(res.body.numEyes).to.eql(164);
      done();
    })
  })
  it('should respond to "put" with updated ghost stats', (done) => {
    request('localhost:3000')
    .put('/ghosts/' + ghostId)
    .send({"ghost":{"name":"PUT","isEvil":"false","numEyes":"21"}, "powers":{"primary":"dolphin friendship","secondary":"depression"}})
    .end((err, res) =>{
      expect(err).to.eql(null);
      expect(res.text).to.eql('Ghost updated!')
      done();
    })
  })
  it('should respond to "delete" with delete message', (done) => {
    request('localhost:3000')
    .del('/ghosts/' + ghostId)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('GHOST BUSTED');
      done();
    })
  })
})

describe('/ghosteyes', () => {
  before((done) => {
    request('localhost:3000')
    .post('/ghosts')
    .send({"name":"BORTET","isEvil":"false","numEyes":"164", "powers":{"primary":"murder"}})
    .end((err, res) =>{
        done();
    })
  })
  before((done) => {
    request('localhost:3000')
    .post('/ghosts')
    .send({"name":"BORTETs","isEvil":"true","numEyes":"164", "powers":{"primary":"murder"}})
    .end((err, res) =>{
        done();
    })
  })
  it('should respond with avg eyes for evil/non evil ghosts', (done) => {
    request('localhost:3000')
    .get('/ghosteyes')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('Our Evil ghosts, on average, have 164 eyes, while our non-evil ghosts average 164 eyes');
      done();
    })
  })
})
