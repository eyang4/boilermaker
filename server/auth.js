const express = require('express')
const router = express.Router()
const {db, User, Model1, Model2} = require('./db')
module.exports = router

router.use('/oauth', require('./oauth'))

router.get('/me', (req, res, next) => {
  // dont need to test for existence of req.user, if it does not exist, return that
  res.json(req.user)
})

router.put('/login', (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  User.findOne({where: {username}})
      .then(user => {
        user ? (user.correctPassword(password))
               ? req.login(user, err => err ? next(err) : res.json(user))
               : res.sendStatus(401)
             : res.sendStatus(401)
      })
      .catch(err => next(err))
})

router.post('/signup', (req, res, next) => {
  // we use post because we are adding an entry to an entire table/model/collection
  const username = req.body.username
  const info = {password: req.body.password}
  User.findOrCreate({where: {username}, defaults: info})
      .then(([user, created]) => {
        // .spread is not required but is useful
        if (!created) res.sendStatus(401)
        else req.login(user, err => err ? next(err) : res.json(user))
      })
      .catch(err => next(err))
})

router.delete('/logout', (req, res, next) => {
  req.logout()
  req.session.destroy(err => err ? next(err) : res.sendStatus(204))
})
