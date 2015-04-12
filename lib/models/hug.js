var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');

var HugSchema = new Schema({
  date: { type: Date, default: Date.now },
  user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
  user2: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

HugSchema.path('user1').validate(function(value, respond) {
  User.findOne({ _id: value}, function(err, user) {
    respond(!err && user);
  });
}, 'User1 doesn\'t exists');

HugSchema.path('user2').validate(function(value, respond) {
  User.findOne({ _id: value}, function(err, user) {
    respond(!err && user);
  });
}, 'User2 doesn\'t exists');

mongoose.model('Hug', HugSchema);
