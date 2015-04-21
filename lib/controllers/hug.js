var mongoose = require('mongoose');
var resHandler = require('../utils/common.js');
var Hug = mongoose.model('Hug');
var User = mongoose.model('User');

exports.countHugs = function(req, res, next) {
  var hugs = 0;

  User.findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      resHandler.respond(res, 'Error occurred: ' + err, false, 500);
    } else {
      Hug.count({ user1: user._id }, function(err, count) {
        if (!err) hugs += count;
  
        Hug.count({ user2: user._id }, function(err, count) {
          if (!err) hugs += count;

          resHandler.respond(res, hugs, true);
        });
      });
    }
  });
};

exports.createHug = function(req, res, next) {
  User.findOne({ _id: req.params.user1 }, function(err, user1) {
    User.findOne({ _id: req.params.user2 }, function(err, user2) {
      var hug = new Hug();
      hug.user1 = user1;
      hug.user2 = user2;
      hug.save(function(err, hug) {
        if (err) {
          resHandler.respond(res, 'Error occurred: ' + err, false, 500);
        } else {
          resHandler.respond(res, hug, true);
        }
      });
    });
  });
};

exports.listHugs = function(req, res, next) {
  Hug.find().populate('author target').exec(function(err, hugs) {
    res.send(hugs);
  });
};
