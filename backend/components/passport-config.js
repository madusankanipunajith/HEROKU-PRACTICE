var LocalStrategy = require('passport-local').Strategy;
const Customer = require('../models/customer')


module.exports = function (passport) {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    function (username, password, done) {
      Customer.findOne({ email: username }, function (err, user) {
        if (err) throw err
        if (!user) {
          return done(null, false);
        }
        if (user.password!=password) {
          return done(null, false);
        }
        return done(null, user); 
      });
    }))


    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      Customer.findById({_id:id}, function(err, user) {
        done(err, user);
      });
    });
}