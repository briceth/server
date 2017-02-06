const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //verify this username and password, call done with the user
  //it it is the correct email and password
  //otherwise, call done false
   User.findOne({ email: email }, function (err, user) {
     if (err) { return done(err); }
     if (!user) { return done(null, false); }

     //compare password - is `password` equal to user.password?
     user.comparePassword(password, function(err, isMatch) {
       if (err) { return done(err); }
       if (!isMatch) { return done(null, false); }
     });
      return done(null, user);
   });
});
//setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //see if the user id and the payload exist in the database
  //if it does, call done
  //otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
