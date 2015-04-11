var fs = require('fs');
var mongoose = require('mongoose');

/* Load database configuration variables */
var config = require('config');
var dbConfig = config.get('Server.dbConfig');

/* Set up logger */
var log = require('./log/log.js');

/* Load Schemas from /lib/models */
var modelsPath = process.cwd() + '/lib/models';
fs.readdirSync(modelsPath).forEach(function(file) {
  if (file.substr(-3) === '.js') {
    require(modelsPath + '/' + file);
  }
});

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
