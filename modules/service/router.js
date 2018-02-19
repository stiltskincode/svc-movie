'use strict'

const handlerMovies = require('./handlerMovies')
const handlersComments = require('./handlerComments')

function registerRouter(app, omdb, config) {
    app.route('/').get((req, res, next) => {
        res.sendStatus(200)
        res.end();
    })
    app.route('/movies')
    .get(handlerMovies.moviesGet())
    .post(handlerMovies.moviesPost(omdb))
    
    app.route('/comments')
    .get(handlersComments.commentsGet())
    .post(handlersComments.commentsPost())
}

module.exports = registerRouter