const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
// process.env.NODE_ENV is by default undefined
require('../secret')
const {User} = require('./db')

const myGoogleStrategy =
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: '/auth/oauth/callback'
  },
    (token, refreshToken, profile, done) => {
      const info = {email: profile.emails[0].value}
      // name = profile.displayName
      // imageUrl = profile.photos[0].value
      User.findOrCreate({where: {googleId: profile.id}, defaults: info})
          .then(([user, created]) => done(null, user))
          // unconcnered with whether it was created or not
          .catch(done)
    }
  )

passport.use(myGoogleStrategy)

router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/callback', passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login'}))

module.exports = router
