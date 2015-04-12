var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

exports.createComment = function(req, res, next) {
  var comment = new Comment(req.body);

  comment.save(function(err, comment) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      User.findOne({ _id: comment.target }, function(err, user) {
        user.comments.push(comment);
        user.save();
      });

      res.json({
        type: true,
        data: comment
      });
    }
  });
};

exports.deleteComment = function(req, res, next) {
  Comment.findOneAndRemove({ username: req.params.username }, function(err, user) {
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
          data: 'Comment ' + req.params.username + ' deleted successfully'
        });
      } else {
        res.json({
          type: false,
          data: 'Comment ' + req.params.username + ' not found'
        });
      }
    }
  });
};

exports.listComments = function(req, res, next) {
  Comment.find().populate('author target').exec(function(err, comments) {
    res.send(comments);
  });
};

exports.updateComment = function(req, res, next) {
  Comment.findOne({ username: req.params.username }, function(err, user) {
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
          data: 'Comment ' + req.params.username + ' not found'
        });
      }
    }
  });
};

exports.viewComment = function(req, res, next) {
  Comment.findOne({ username: req.params.username }, function(err, user) {
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
          data: 'Comment ' + req.params.username + ' not found'
        });
      }
    }
  });
};
