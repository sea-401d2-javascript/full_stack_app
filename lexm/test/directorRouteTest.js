'use strict';

process.env.MONGO_URI = 'mongodb://localhost/director_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
var models = require(__dirname + '/../models');
var Director = models.Director;
require(__dirname + '/../server');

var testUser = 'user1';
var testPass = '23456789';
var token = '';

describe('testing Director API', function() {

  before(function(done) {
    var userParams = JSON.parse(`{"name": "${testUser}", "group": "users", "password": "${testPass}"}`);
    request('localhost:3000')
    .post('/admin')
    .send(userParams)
    .end(function(err, res) {
      if(err) {
        console.error(err);;
      } else {
        request('localhost:3000')
        .post('/login')
        .auth(testUser, testPass)
        .end(function(err, res) {
          if(err) {
            console.error(err);
          } else if (!res.body.token){
            console.log('no token');
          } else {
            token = req.body.token;
            console.log('token is' + token);
          }
      })
      };
    })
    done();
  })
  // var token = res.body.token;

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to add a new director', function(done) {
    request('localhost:3000')
    .post('/directors')
    .set('Token', token)
    .send({'name': 'Steven Soderbergh', 'date_of_birth': 'January 14, 1963'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Steven Soderbergh');
      expect(Date(res.body.date_of_birth)).to.eql(Date('January 14, 1963'));
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  it('should be able to retrieve list of directors', function(done) {
    request('localhost:3000')
    .get('/directors')
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body.data)).to.eql(true);
      done();
    });
  });

  it('should be able to fetch number of directors', function(done) {
    request('localhost:3000')
    .get('/directors/size')
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.eql('1');
      done();
    });
  });

});

describe('need to have existing director to test with', function() {

  beforeEach(function(done) {
    var testDirector = new Director({'name': 'Alejandro González Iñárritu', 'date_of_birth': 'August 15, 1962'});
    testDirector.save(function(err, data) {
      if(err) throw err;
      this.testDirector = data;
      done();
    }.bind(this));
  });

  it('should have created director in forEach block', function(done) {
    expect(this.testDirector.name).to.eql('Alejandro González Iñárritu');
    expect(Date(this.testDirector.date_of_birth)).to.eql(Date('August 15, 1962'));
    expect(this.testDirector).to.have.property('_id');
    done();
  });

  it('should be able to look up individual director entry', function(done) {
    var id = this.testDirector._id;
    request('localhost:3000')
    .get('/directors/' + id)
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Alejandro González Iñárritu');
      expect(Date(res.body.date_of_birth)).to.eql(Date('August 15, 1962'));
      done();
    });
  });

  it('should be able to update director', function(done) {
    var id = this.testDirector._id;
    request('localhost:3000')
    .put('/directors/' + id)
    .set('Token', token)
    .send({'name': 'Alejandro González Iñárritu', 'date_of_birth': 'August 15, 1963'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Alejandro González Iñárritu');
      expect(Date(res.body.date_of_birth)).to.eql(Date('August 15, 1963'));
      done();
    });
  });

  it('should be able to delete director', function(done) {
    var id = this.testDirector._id;
    request('localhost:3000')
    .set('Token', token)
    .del('/directors/' + id)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.message).to.eql('director removed');
      done();
    });
  });
});
