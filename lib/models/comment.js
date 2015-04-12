var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');

var CommentSchema = new Schema({
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  target: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

CommentSchema.path('author').validate(function(value, respond) {
  User.findOne({ _id: value}, function(err, user) {
    respond(!err && user);
  });
}, 'Author doesn\'t exists');

CommentSchema.path('target').validate(function(value, respond) {
  User.findOne({ _id: value}, function(err, user) {
    respond(!err && user);
  });
}, 'Target user doesn\'t exists');

mongoose.model('Comment', CommentSchema);
