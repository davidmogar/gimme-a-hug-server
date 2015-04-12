var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  "username": { type: String, unique: true, required: true },
  "password": { type: String, required: true },
  "comments": [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  "followers": [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

mongoose.model('User', UserSchema);
