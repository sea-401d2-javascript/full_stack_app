'use strict';

process.env.MONGO_URI = 'mongodb://localhost/movie_test';
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var request = chai.request;
var expect = chai.expect;
var models = require(__dirname + '/../models');
var Movie = models.Movie;
require(__dirname + '/../server');

var testUser = 'user2';
var testPass = '98765431';
var token = '';

describe('testing Movie API', function() {

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
          done();
      })
      };
    })
  })

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to add a new movie', function(done) {
    request('localhost:3000')
    .post('/movies')
    .set('Token', token)
    .send({
      'name': 'Sex, Lies, and Videotape',
      'release_date': 'January 20, 1989'
    })
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Sex, Lies, and Videotape');
      expect(Date(res.body.release_date)).to.eql(Date('January 20, 1989'));
      expect(res.body).to.have.property('_id');
      done();
    });

  });

  it('should be able to retrieve list of movies', function(done) {
    request('localhost:3000')
    .get('/movies')
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(typeof res.body).to.eql('object');
      expect(Array.isArray(res.body.data)).to.eql(true);
      done();
    });
  });

  it('should be able to fetch number of movies', function(done) {
    request('localhost:3000')
    .get('/movies/size')
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.text).to.eql('1');
      done();
    });
  });
});

describe('need to have existing movie to test with', function() {

  beforeEach(function(done) {
    var testMovie = new Movie({'name': 'Traffic', 'release_date': 'December 27, 2000'});
    testMovie.save(function(err, data) {
      if(err) throw err;
      this.testMovie = data;
      done();
    }.bind(this));
  });

  it('should have created movie in forEach block', function(done) {
    expect(this.testMovie.name).to.eql('Traffic');
    expect(this.testMovie).to.have.property('_id');
    done();
  });

  it('should be able to look up individual movie entry', function(done) {
    var id = this.testMovie._id;
    request('localhost:3000')
    .get('/movies/' + id)
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Traffic');
      expect(Date(res.body.release_date)).to.eql(Date('December 27, 2000'));
      done();
    });
  });

  it('should be able to update movie', function(done) {
    var id = this.testMovie._id;
    request('localhost:3000')
    .put('/movies/' + id)
    .set('Token', token)
    .send({'name': 'Traffic', 'release_date': 'January 5, 2001'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('Traffic');
      expect(Date(res.body.release_date)).to.eql(Date('January 5, 2001'));
      done();
    });
  });
  it('should be able to delete movie', function(done) {
    var id = this.testMovie._id;
    request('localhost:3000')
    .del('/movies/' + id)
    .set('Token', token)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.message).to.eql('movie removed');
      done();
    });
  });
});
