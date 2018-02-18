'use strict'

let config = {};
config.service = {};
config.app = {};
config.db = {};
config.omdb = {};

config.app.env = 'dev';
config.service.port = 3000;

config.db.url = 'mongodb://localhost:27017/imdb';

config.omdb.apiKey = "c7d3cb12",

module.exports = config;