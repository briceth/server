const mongoose = require('mongoose');
const Schema = mongoose.Schema; //??
const bcrypt = require('bcrypt-nodejs');

// Define our model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, unique: true }

});
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if(err) { return next(err); }
    
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      user.password = hash;
      next();
    });
  });
});
//create the model class
const ModelClass = mongoose.model('user', UserSchema); //load the schema in mongoose

//export the model
module.exports = ModelClass;
