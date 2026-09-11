const FacebookStrategy = require('passport-facebook').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET_KEY,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profile: ['id', 'displayName']
},
function(accessToken, refreshToken, profile, done) {
  User.findOne({ facebookId: profile.id }, function(err, user) {
    if(err) {
      console.log(err);
    }
    if (user) {
      done(null, user);
    } else {
      user = new User({
        facebookId: profile.id,
        displayName: profile.displayName,
        image: profile.photos[0].value,
      });
      user.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("saving user ...");
          done(null, user);
        }
      });
    }
  });
}
));
  
passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})
}
