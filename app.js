'use strict'

const service = require('./modules/service/')
const config = require('./config');
const omdbApi = require('omdb-api-pt');

let omdb = new omdbApi({
    apiKey: process.env.OMDB_APIKEY || config.omdb.apiKey
})

let s = new service(config, omdb)
s.run(process.env.SERVICE_PORT || config.service.port)