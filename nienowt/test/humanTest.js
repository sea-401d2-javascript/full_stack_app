'use strict'

var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
require(__dirname + '/../server.js');

let Human = require(__dirname + '/../models/human-model');

describe('human routes', () => {
  var humanId;

  before((done) => {
    Human.remove({},(err) => {
      if (err) console.log('err: ' + err);
      console.log('ghosts cleared');
      done();
    });
  });
  it('should store new human', (done) => {
    request('localhost:3000')
    .post('/humans')
    .send({"name":"pelt", "isCool":"false","numTeeth":"15"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('pelt');
      humanId = res.body._id;
      done();
    });
  });
  it('should return humans on GET', (done) => {
    request('localhost:3000')
    .get('/humans')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.body.humans[0].name).to.eql('pelt')
      done();
    })
  })
  it('should return altered human on PUT', (done) => {
    request('localhost:3000')
    .put('/humans/' + humanId)
    .send({"name":"pelted", "isCool":"true","numTeeth":"14"})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('HUMAN ALTERED')
      done();
    })
  })
  it('should delete human', (done) => {
    request('localhost:3000')
    .del('/humans/' + humanId)
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.text).to.eql('HUMAN ELIMINATED')
      done();
    })
  })
})
