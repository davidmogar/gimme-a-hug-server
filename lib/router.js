var restify = require('restify');
var fs = require('fs');

var controllers = {};
var controllersPath = process.cwd() + '/lib/controllers';

/* Iterate controllers and refence them */
fs.readdirSync(controllersPath).forEach(function(file) {
  if (file.substr(-3) === '.js') {
    controllers[file.split('.')[0]] = require(controllersPath + '/' + file);
  }
});

var server = restify.createServer();
server.use(restify.fullResponse());
server.use(restify.bodyParser());

/* Define endpoint handlers */
server.post('/users', controllers.user.createUser);
server.put('/users/:username', controllers.user.updateUser);
server.del('/users/:username', controllers.user.deleteUser);
server.get('/users/:username', controllers.user.viewUser);

var port = process.env.PORT || 3000;
server.listen(port, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Server listening at port ' + port);
  }
});

if (process.env.environment == 'production') {
  process.on('uncaughtException', function(err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)));
  });
}
