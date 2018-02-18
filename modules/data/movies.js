'use strict'

const mongoose = require('mongoose');
const models = require('./models.js');

let saveMoveIntoDb = (movie) => new Promise((resolve, reject) => {
    let query = { imdbID: movie.imdbID };
    models.MovieModel.findOne(query).then(dbmovie => {
        if(dbmovie){
            dbmovie.set(movie);
        }else{
            dbmovie = new models.MovieModel(movie);
        }
        dbmovie.save((err, movie) => { 
            if (err){
                reject(err);
                return
            }
            resolve(movie);
        });
    })
});

class MoviesRepository{
    find(query) {
        return new Promise((resolve, reject) => {
            var query = models.MovieModel.find(query);
            query.exec(function (err, movies) {
                if (err) {
                    reject(err);
                    return
                }
                resolve(movies);
            })
        });
    }

    update(query, movieDb) {
        return  new Promise((resolve, reject) => {
            movieDb.byId(query).then(movie => {
                saveMoveIntoDb(movie)
                .then(movie => {
                    resolve(movie);
                })
                .catch(err => {
                    reject(err);
                })
            })
        });
    }
}; 

module.exports = MoviesRepository;