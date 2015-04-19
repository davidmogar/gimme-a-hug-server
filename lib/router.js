var restify = require('restify');
var fs = require('fs');
var log = require('./log/log.js');

/* Load database configuration variables */
var config = require('config');
var restifyConfig = config.get('Server.restify');

var commentRoutes = require('./controllers/comment.js');
var hugRoutes = require('./controllers/hug.js');
var userRoutes = require('./controllers/user.js');

var server = restify.createServer({ log: log.logger });
server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.pre(function(req, res, next) {
  req.log.debug(req.method + ' ' + req.url + ' from ' + req.connection.remoteAddress);
  next();
});

/* Comment endpoint handlers */
server.post('/comments', commentRoutes.createComment);
server.del('/comments/:id', commentRoutes.deleteComment);
server.get('/comments', commentRoutes.listComments);
server.get('/comments/:id', commentRoutes.viewComment);

/* Hug endpoint handlers */
server.get('/users/:id/hugs', hugRoutes.countHugs);
server.post('/hugs', hugRoutes.createHug);
server.get('/hugs', hugRoutes.listHugs);

/* User endpoint handlers */
server.post('/users', userRoutes.createUser);
server.del('/users/:id', userRoutes.deleteUser);
server.post('/users/:id_user_1/follow/:id_user_2', userRoutes.followUser);
server.get('/users', userRoutes.listUsers);
server.put('/users/:id', userRoutes.updateUser);
server.get('/users/:id', userRoutes.viewUser);

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
