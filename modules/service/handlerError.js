'use strict'

let errors = {
    'ErrNoMovieFound' : {
        errorCode: 500, 
        error: { msg: 'Invalid request. No movie found in db'}
    },
    'ErrInvalidRequestBody' : {
        errorCode: 500, 
        error: { msg: 'Invalid request. Invalid request body'}
    },
    'ErrInternalError':{
        errorCode: 500, 
        error: { msg: 'Internal error.'}
    }
};

function handlerError(err, req, res, next) {
    let e = errors[err];
    if (!e){
        e = errors['ErrInternalError'];
    }
    res.status(e.errorCode).send(e.error);
    next()
}

module.exports = handlerError