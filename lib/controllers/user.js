var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var resHandler = require('../utils/common.js');
var User = mongoose.model('User');

exports.getProfileImage = function(req, res, next) {
  var image = path.join('/var/www/html/gimmeahug',  req.params.id);
  
  fs.exists(image, function(exists) {
    if (exists) {
      var stat = fs.statSync(image);

      res.writeHead(200, {
        'Content-Type:': 'image',
        'Content-Length': stat.size
      });

      var stream = fs.createReadStream(image);
      stream.pipe(res);
    } else {
      resHandler.respond(res, 'File doesn\'t exists', false, 500);
    }
  });
};

exports.uploadProfileImage = function(req, res, next) {
  var path = __dirname + '/var/www/html/gimmeahug';
  var fileName = req.files.source.name
  fileName = req.params.id;

  fs.rename(req.files.source.path, path + fileName, function(err) {
    if (err){
      resHandler.respond(res, 'Error occurred: ' + err, false);
    } else {
      resHandler.respond(res, 'Image saved', true);
    }
  });
};

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
    resHandler.respond(res, users, true);
  });
};

exports.getStarred = function(req, res, next) {
  User.find({ followers: req.params.id }).exec(function(err, users) {
    resHandler.respond(res, users, true);
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

exports.acceptHug = function(req, res, next) {
  User.findOne({ _id: req.params.id_user_1 }).exec().then(function(user1) {
    if (user1 === null) throw new Error('User ' + req.params.id_user_1 + ' not found');

    return User.findOneAndUpdate({ _id: req.params.id_user_2 }, {$push: {acceptedHugs: user1}}).exec();
  }).then(function(user2) {
    if (user2 === null) throw new Error('User ' + req.params.id_user_2 + ' not found');

    resHandler.respond(res, 'Accepted hug added', true);
  }, function(err) {
    resHandler.respond(res, 'Error occurred: ' + err, false, 500);
  });
};

exports.addHugNotification = function(req, res, next) {
  User.findOne({ _id: req.params.id_user_2 }).exec().then(function(user2) {
    if (user2 === null) throw new Error('User ' + req.params.id_user_2 + ' not found');

    return User.findOneAndUpdate({ _id: req.params.id_user_1 }, {$push: {hugNotifications: user2}}).exec();
  }).then(function(user1) {
    if (user1 === null) throw new Error('User ' + req.params.id_user_1 + ' not found');

    resHandler.respond(res, 'Notification added', true);
  }, function(err) {
    resHandler.respond(res, 'Error occurred: ' + err, false, 500);
  });
};

exports.updateLocation = function(req, res, next) {
  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        user.latitude = req.body.latitude;
        user.longitude = req.body.longitude;
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
  User.findOne({ _id: req.params.id }).populate('comments hugNotifications').exec(function(err, user) {
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

exports.consumeHugNotifications = function(req, res, next) {
  User.findOne({ _id: req.params.id }).populate('comments hugNotifications').exec(function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        user.update({ $set: { hugNotifications: [] }}, function(err, affected){});
        resHandler.respond(res, user.hugNotifications, true);
      } else {
        resHandler.respond(res, 'User ' + req.params.id + ' not found', false);
      }
    }
  });
};

exports.consumeAcceptedHugs = function(req, res, next) {
  User.findOne({ _id: req.params.id }).populate('comments acceptedHugs').exec(function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        user.update({ $set: { acceptedHugs: [] }}, function(err, affected){});
        resHandler.respond(res, user.acceptedHugs, true);
      } else {
        resHandler.respond(res, 'User ' + req.params.id + ' not found', false);
      }
    }
  });
};

exports.validate = function(req, res, next) {
  User.findOne({ email: req.params.email }).exec(function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      if (user) {
        resHandler.respond(res, user, true);
      } else {
        resHandler.respond(res, 'User with email ' + req.params.email + ' not found', false);
      }
    }
  });
};
