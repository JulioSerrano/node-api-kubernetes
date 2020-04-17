var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {

  before(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });


  describe('1 - Create person', function() {
    it('should add a person', function(done) {
      chai.request(server)
      .post('/people')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .send({
        rut : '193916813',
        name: 'Julio',
        lastName: 'Serrnao',
        age: 23,
        course: '3B'
      })
      .end(function(err, res) {
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('2 - Get all persons', function() {
    it('should get all persons', function(done) {
      chai.request(server)
      .get('/people')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
    });
  });

  describe('3 - Get one person with id 1', function() {
    it('should return a single person', function(done) {
      chai.request(server)
      .get('/people/1')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('object');
        done();
      });
    });
  });

  describe('4 - Update a person with id 1', function() {
    it('should update a person', function(done) {
      chai.request(server)
      .put('/people/1')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .send({
        name: 'Julio',
      })
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('5 - Delete a person with id 1', function() {
    it('should delete a person', function(done) {
      chai.request(server)
      .delete('/people/1')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .end(function(error, response) {
        response.should.have.status(200);
        done();
      });
    });
  });

  describe('6 - Create person with incorrect param', function() {
    it('should return error 400', function(done) {
      chai.request(server)
      .post('/people')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .send({
        rut : '193916813',
        name: 'Julio',
        lastName: 'Serrnao',
        age: true,
        course: 10
      })
      .end(function(err, res) {
        res.should.have.status(400);
        done();
      });
    });
  });

  describe('7 - Get one person with id 1 after deleted', function() {
    it('should return a error 404', function(done) {
      chai.request(server)
      .get('/people/1')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .end(function(err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });

  describe('8 - Delete a person with id 1 after deleted', function() {
    it('should return error 404', function(done) {
      chai.request(server)
      .delete('/people/1')
      .set('Authorization', 'Basic YWRtaW46c2VjcmV0')
      .end(function(error, response) {
        response.should.have.status(404);
        done();
      });
    });
  });
});