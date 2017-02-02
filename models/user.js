const mongoose = require('mongoose');
const Schema = mongoose.Schema; //??

// Define our model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, unique: true }

});

//create the model class
const ModelClass = mongoose.model('user', UserSchema); //load the schema in mongoose

//export the model
module.exports = ModelClass;
