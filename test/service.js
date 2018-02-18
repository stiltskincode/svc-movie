
process.env.NODE_ENV = 'test';

let config = require('./config')

let mongoose = require("mongoose");
let models = require('../modules/data/models');

let chai = require('chai');
let chaiHttp = require('chai-http');
let service = require('../modules/service/');
let should = chai.should();

let testMovie = {
    imdbID: "0001",
    title: "The Lord of the Rings"
}

let testComment = {
    imdbID: testMovie.imdbID,
    text: "Best movie ever - test comment!"
}

class OmbdMock{
    byId(title){
        return new Promise((resolve, reject) => {
            resolve(testMovie)
        })
    }
}

let omdbMock = new OmbdMock()

chai.use(chaiHttp);
s = new service(config, omdbMock)

describe('Service', () => {
    before((done) => {
        s.run(process.env.SERVICE_PORT || config.service.port, true);
        done();
    });
    beforeEach((done) => {
        models.MovieModel.remove({}, (err) => { 
            models.CommentModel.remove({}, (err) => { 
                done(); 
            })  
        });     
    });

    after((done) => {
        s.down();
        done();
    });

     describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            let m = new models.MovieModel(testMovie);
            m.save((err, movie) => {});

            chai.request(s.app)
                .get('/movies')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                  done();
                });
          });
     })

     describe('/POST movies', () => {
        it('it should POST a movie title and download movie and save in db', (done) => {
          let movie = {
              title: "The Lord of the Rings"
          }
          chai.request(s.app)
              .post('/movies')
              .send(movie)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title', 'The Lord of the Rings');
                res.body.should.have.property('imdbID', "0001",);
                done();
              });
        });
    })

    describe('/GET comments', () => {
        it('it should GET all the comments', (done) => {
            let m = new models.MovieModel(testMovie);
            m.save((err, movie) => {
                //after save movie, save comment
                let c = new models.CommentModel(testComment);
                c.save((err, movie) => {
                    //after sabe comment, test GET comments
                    chai.request(s.app)
                    .get('/comments')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(1);
                      done();
                    });
                });
            });
        });
     })
     describe('/POST comment', () => {
        it('it should POST a comment and save in db', (done) => {
            let m = new models.MovieModel(testMovie);
            m.save((err, movie) => {
                chai.request(s.app)
                .post('/comments')
                .send(testComment)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('text', 'Best movie ever - test comment!');
                  res.body.should.have.property('imdbID', '0001');
                  done();
                });
          });
        })
    })
})