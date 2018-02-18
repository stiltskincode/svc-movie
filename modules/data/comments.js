'use strict'

var mongoose = require('mongoose');
var models = require('./models.js');

class CommentsRepository{
    find(query) {
        return new Promise((resolve, reject) => {
                var query = models.CommentModel.find(query);
                query.exec(function (err, comments) {
                if (err) {
                    reject(err);
                    return
                }
                resolve(comments);
            })
        })
    }
    async add(comment){
        return  new Promise((resolve, reject) => {
            let query = { imdbID: comment.imdbID };
            models.MovieModel.findOne(query).then(movie => {
                if (!movie){
                    reject('ErrInvalidRequestNoMovie')
                    return;
                }
                let commentdb = new models.CommentModel(comment);
                commentdb.save((err, dbComment) => {  
                    if (err) {
                        reject(err);
                        return
                    }
                    resolve(comment);
                });
            })
        });
    }
}

module.exports = CommentsRepository;

