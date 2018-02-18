'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const MovieSchema = new Schema({
    imdbID: { type : String , unique : true, required : true },
    Title: String
},{ strict: false });

let MovieModel = mongoose.model('Movie', MovieSchema);

var CommentSchema = new Schema({
    imdbID: { type : String ,required : true },
    text: { type : String , required : true }
});

let CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = {
     MovieModel,
     CommentModel
}




