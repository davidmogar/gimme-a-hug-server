var restify = require('restify');
var fs = require('fs');
var log = require('./log/log.js');

/* Load database configuration variables */
var config = require('config');
var restifyConfig = config.get('Server.restify');

var controllers = {};
var controllersPath = process.cwd() + '/lib/controllers';

/* Iterate controllers and refence them */
fs.readdirSync(controllersPath).forEach(function(file) {
  if (file.substr(-3) === '.js') {
    var baseName = file.slice(0, -3);
    controllers[baseName] = require(controllersPath + '/' + file);
    log.logger.info('Controller \'' + baseName + '\' loaded');
  }
});

var server = restify.createServer({ log: log.logger });
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.pre(function(req, res, next) {
  req.log.debug(req.method + ' ' + req.url + ' from ' + req.connection.remoteAddress);
  next();
});

/* User endpoint handlers */
server.post('/users', controllers.user.createUser);
server.del('/users/:username', controllers.user.deleteUser);
server.get('/users', controllers.user.listUsers);
server.put('/users/:username', controllers.user.updateUser);
server.get('/users/:username', controllers.user.viewUser);

/* Comment endpoint handlers */
server.post('/comments', controllers.comment.createComment);
server.del('/comments/:id', controllers.comment.deleteComment);
server.get('/comments', controllers.comment.listComments);
server.get('/comments/:id', controllers.comment.viewComment);

server.listen(restifyConfig.port, function() {
  log.logger.info('Restify server listening at port ' + restifyConfig.port);
});

if (process.env.NODE_ENV == 'production') {
  process.on('uncaughtException', function(err) {
    if (err.errno === 'EADDRINUSE') {
      log.logger.error('Can\'t start restify server: Address already in use');
      process.exit(1);
    } else {
      log.logger.error('Uncaught exception: ' + JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
    }
  });
}
