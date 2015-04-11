var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
  author: { type: String, ref: "User" },
  target: { type: String, ref: "User" }
});

mongoose.model('Comment', CommentSchema);
