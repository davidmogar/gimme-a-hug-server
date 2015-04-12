var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(req, res, next) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      res.json({
        type: true,
        data: user
      });
    }
  });
};

exports.deleteUser = function(req, res, next) {
  User.findOneAndRemove({ username: req.params.username }, function(err, user) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      if (user) {
        res.json({
          type: true,
          data: 'User ' + req.params.username + ' deleted successfully'
        });
      } else {
        res.json({
          type: false,
          data: 'User ' + req.params.username + ' not found'
        });
      }
    }
  });
};

exports.followUser = function(req, res, next) {
  User.findOne({ username: req.params.user1 }, function(err, user1) {
    if (err) {
      res.status(500);
      res.json({ type: false, data: 'Error occurred: ' + err });
    } else {
      if (user1) {
        User.findOne({ username: req.params.user2 }, function(err, user2) {
          if (err) {
            res.status(500);
            res.json({ type: false, data: 'Error occurred: ' + err });
          } else {
            if (user2) {
              user2.followers.push(user1);
              user2.save();
              res.json({
                type: true,
                data: 'User ' + req.params.user1 + ' is now following user ' + req.params.user2
              });
            } else {
              res.json({
                type: false,
                data: 'User ' + req.params.user2 + ' not found'
              });
            }
          }
        });
      } else {
        res.json({
          type: false,
          data: 'User ' + req.params.user1 + ' not found'
        });
      }
    }
  });
};

exports.listUsers = function(req, res, next) {
  User.find().exec(function(err, users) {
    res.send(users);
  });
};

exports.updateUser = function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      if (user) {
        user.password = req.body.password;
        user.save(function(err) {
          if (err) {
            res.json({
              type: true,
              data: 'Error occurred: ' + err
            });
          } else {
            res.json({
              type: true,
              data: user
            });
          }
        });
      } else {
        res.json({
          type: false,
          data: 'User ' + req.params.username + ' not found'
        });
      }
    }
  });
};

exports.viewUser = function(req, res, next) {
  User.findOne({ username: req.params.username }).populate('comments').exec(function(err, user) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      if (user) {
        res.json({
          type: true,
          data: user 
        });
      } else {
        res.json({
          type: false,
          data: 'User ' + req.params.username + ' not found'
        });
      }
    }
  });
};
