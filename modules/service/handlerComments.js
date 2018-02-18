
'use strict'

const CommentsRepository = require('./../data/comments.js')
let commentsRepository = new CommentsRepository();

let commentsGet = () => {
    return async (req, res, next) => {
        try {
            let comments = await commentsRepository.find()
                res.send(comments);
                res.end();
            }
            catch(e) {
                return next(e)
            }
    }
}
let commentsPost = () => {
    return async (req, res, next) => {
        let b = req.body;
        if (!b.imdbID){
            return next('ErrInvalidRequestBody')
        }
        try {
            let comment = await commentsRepository.add(b);
            res.send(comment);
            res.end();
        } catch (e) {
            return next(e)
        }
    }
}

module.exports = { 
    commentsGet,
    commentsPost
}