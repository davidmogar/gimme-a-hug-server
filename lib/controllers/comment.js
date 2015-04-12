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
  Comment.findOneAndRemove({ _id: req.params.id }, function(err, comment) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      if (comment) {
        res.json({
          type: true,
          data: 'Comment ' + req.params.id + ' deleted successfully'
        });
      } else {
        res.json({
          type: false,
          data: 'Comment ' + req.params.id + ' not found'
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

exports.viewComment = function(req, res, next) {
  Comment.findOne({ _id: req.params.id }).populate('author target').exec(function(err, comment) {
    if (err) {
      res.status(500);
      res.json({
        type: false,
        data: 'Error occurred: ' + err
      });
    } else {
      if (comment) {
        res.json({
          type: true,
          data: comment
        });
      } else {
        res.json({
          type: false,
          data: 'Comment ' + req.params.id + ' not found'
        });
      }
    }
  });
};
