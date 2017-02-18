const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function(req, res, next) {
  //a user has already their email and password
  //we just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}


exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)
  
  if( !email || !password) {
    return res.status(422).send({ error: 'you must provide email and password'});
  }
//see if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err); }

    //if a user with a email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'user already exist' });
    }

  //if a user with a email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err); }
      //repond to request indicating  the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
