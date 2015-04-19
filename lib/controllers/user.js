var mongoose = require('mongoose');
var resHandler = require('../utils/common.js');
var User = mongoose.model('User');

exports.createUser = function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      resHandler.respond(res, user, true);
    }
  });
};

exports.deleteUser = function(req, res, next) {
  User.findOneAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        resHandler.respond(res, 'User ' + req.params.id + ' deleted successfully', true);
      } else {
        resHandler.respond(res, 'User ' + req.params.id + ' not found', false);
      }
    }
  });
};

exports.followUser = function(req, res, next) {
  User.findOne({ _id: req.params.id_user_1 }).exec().then(function(user1) {
    if (user1 === null) throw new Error('User ' + req.params.id_user_1 + ' not found');

    return User.findOneAndUpdate({ _id: req.params.id_user_2 }, {$push: {followers: user1}}).exec();
  }).then(function(user2) {
    if (user2 === null) throw new Error('User ' + req.params.id_user_2 + ' not found');

    resHandler.respond(res, 'User ' + req.params.id_user_1 + ' is now following user '
         + req.params.id_user_2, true);
  }, function(err) {
    resHandler.respond(res, 'Error occurred: ' + err, false, 500);
  });
};

exports.listUsers = function(req, res, next) {
  User.find().exec(function(err, users) {
    res.send(users);
  });
};

exports.updateUser = function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        user.username = req.body.username;
        user.password = req.body.password;
        user.save(function(err) {
          if (err) {
            resHandler.respond(res, 'Error occurred: ' + err, false, 500);
          } else {
            resHandler.respond(res, user, true);
          }
        });
      } else {
        resHandler.respond(res, 'User ' + req.params.id + ' not found', false);
      }
    }
  });
};

exports.viewUser = function(req, res, next) {
  User.findOne({ _id: req.params.id }).populate('comments').exec(function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        resHandler.respond(res, user, true);
      } else {
        resHandler.respond(res, 'User ' + req.params.id + ' not found', false);
      }
    }
  });
};
