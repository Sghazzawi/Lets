var passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , config = require('./authConfig');


var Auth = function () {
  passport.use(new GoogleStrategy({
      returnURL: config.google.returnURL,
      realm: config.google.realm 
    },
    function(identifier, profile, done) {
      console.log("google identifier: "+identifier);
      console.dir(profile);
      done(null, profile);
    }
  ));

  passport.use(new TwitterStrategy({
      consumerKey: config.twitter.consumerKey,
      consumerSecret: config.twitter.consumerSecret,
      callbackURL: config.twitter.callbackURL
    },
    function(token,tokenSecret, profile, done) {
      console.log("twittr token: "+token);
      console.log("twittr token secret: "+tokenSecret);
      console.dir(profile);
      done(null, profile);
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  return passport;
};

module.exports = Auth;

