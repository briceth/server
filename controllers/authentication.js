const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if( !email || !password) {
    return res.status(422).send({ error: 'you must provide email and password'});
  }
//see if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err); }

    //if a user with a email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'email is already used' });
    }

  //if a user with a email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err) {
      if(err) { return next(err); }
      //repond to request indicating  the user was created
      res.json({ success: true });
    });
  });
}
