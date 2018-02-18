'use strict'

let config = {};
config.service = {};
config.app = {};
config.db = {};
config.omdb = {};

config.app.env = 'test';
config.service.port = 8080;

config.db.url = 'mongodb://localhost:27017/imdb_test';

config.omdb.apiKey = "c7d3cb12",

module.exports = config;