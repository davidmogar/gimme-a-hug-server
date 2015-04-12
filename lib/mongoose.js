var fs = require('fs');
var mongoose = require('mongoose');

/* Load database configuration variables */
var config = require('config');
var dbConfig = config.get('Server.dbConfig');

/* Set up logger */
var log = require('./log/log.js');

/* Load Schemas from /lib/models */
require('./models/user.js');
require('./models/comment.js');

mongoose.connect(dbConfig.url, dbConfig.options);
var db = mongoose.connection;

db.on('error', function(err) {
  log.logger.error('Cant\'t connect with the database: ' + err.message);
});

db.once('open', function callback() {
  log.logger.info('Database connection established');
});

db.on('disconnected', function() {
  log.logger.info('Disconnected from database');
});
