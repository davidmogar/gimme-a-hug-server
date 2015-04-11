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

exports.updateUser = function(req, res, next) {
  var user = new User(req.body);
  User.findOneAndUpdate({ username: req.params.username }, req.body, function(err, user) {
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

exports.viewUser = function(req, res, next) {
  User.findOne({ username: req.params.username }, function(err, user) {
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
