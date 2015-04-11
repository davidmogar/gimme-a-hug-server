var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.createUser = function(req, res, next) {

};

exports.deleteUser = function(req, res, next) {

}

exports.updateUser = function(req, res, next) {

};

exports.viewUser = function(req, red, next) {
  User.findOne({ username: req.params.username }), function(err, user) {
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
  });
};
