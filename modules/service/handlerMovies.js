'use strict'

const MoviesRepository = require('./../data/movies.js');

let moviesRepository = new MoviesRepository();

class MoviePostReq{
    constructor(model){
        this.title = model.title;
    }
    isValid(){
        if (!this.title){
            return false;
        }
        return true;
    }
}

let moviesPost = (omdb) => {
    return async (req, res, next) => {
        let movieReq = new MoviePostReq(req.body)
        if (!movieReq.isValid()){
            return next("ErrInvalidRequestBody")
        }
        try {
            let movie = await moviesRepository.update({'title': movieReq.title}, omdb)
            res.send(movie);
            res.end();
        }
        catch(e) {
            return next(e)
        }
    }
}

let moviesGet = () => {
    return async (req, res, next) => {
        try {
            let movies = await moviesRepository.find({})
                res.send(movies);
                res.end();
            }
            catch(e) {
                return next(e)
            }
    }
}

module.exports = { 
    moviesGet,
    moviesPost
}