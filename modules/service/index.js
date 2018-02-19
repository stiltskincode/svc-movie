'use strict'

const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston'); 

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Log = require('log');
const mongoose = require('mongoose');

const registerRouter = require('./router');
const errorHandler = require('./handlerError');

class service {
    constructor(config, omdb, log = new Log()) {
        this.app = express();
        this.app.locals.log = log;
        this.config = config;
        this.omdb = omdb;
    }
    
    run(port, silent = false) {
        mongoose.connect(process.env.DB_URL || this.config.db.url);
        mongoose.Promise = global.Promise;

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(methodOverride());
        this.app.use(expressWinston.logger({
            transports: [
              new winston.transports.Console({
                json: true,
                colorize: true,
                silent: silent
              })
            ]
          }));
        registerRouter(this.app, this.omdb, this.config)
        this.app.use(expressWinston.errorLogger({
            transports: [
              new winston.transports.Console({
                json: true,
                colorize: true,
                silent: silent
              })
            ]
        }));
        this.app.use(errorHandler)
        this.http_server = this.app.listen(port, () => {
            console.log(`Node.js app is listening on port:${port}`);
        });
    }

    down(){
        this.http_server.close(function() {
            process.exit();
        });
    }
}

module.exports = service