var mongoose = require('mongoose');
var fs = require('fs');
var bunyan = require('bunyan');

var log = bunyan.createLogger({ name: 'gimme-a-hug' });

var modelsPath = process.cwd() + '/lib/models';
fs.readdirSync(modelsPath).forEach(function(file) {
  if (file.substr(-3) === '.js') {
    require(modelsPath + '/' + file);
  }
});

mongoose.connect(process.env.MONGO_URL, {server: {auto_reconnect: true}});
var db = mongoose.connection;

db.on('error', function(err) {
  log.error('Cant\'t connect with the database: ' + err.message);
});

db.once('open', function callback() {
  log.info('Database connection established');
});

db.on('disconnected', function() {
  log.info('Disconnected from database');
});
