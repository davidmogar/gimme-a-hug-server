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
  User.findOne({ username: req.params.user1 }).exec().then(function(user1) {
    if (user1 === null) throw new Error('User ' + req.params.user1 + 'not found');

    return User.findOneAndUpdate({ username: req.params.user2 }, {$push: {followers: user1}}).exec();
  }).then(function(user2) {
    if (user2 === null) throw new Error('User ' + req.params.user2 + ' not found');

    res.json({
      type: true,
      data: 'User ' + req.params.user1 + ' is now following user ' + req.params.user2
    });
  }, function(err) {
    res.status(500);
    res.json({ type: false, data: 'Error occurred: ' + err });
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
