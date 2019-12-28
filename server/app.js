const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
// associate our permanent session storage solution with the session
const {db, User, Model1, Model2} = require('./db')
const dbStore = new SequelizeStore({db})
// instantiate our permanent session storage solution with the database it will be using
const passport = require('passport')

dbStore.sync({force: true})
// have SequelizeStore create and sync the table/model in the database
app.use(express.static(path.join(__dirname, '../public/')))
// express.static defines the directory on the server to be accessed
// by a request for a specific directory from a client
// if __dirname was not specified, express.static starts at the location node is run from
// and opens us up to errors
// above defines that all files client requests are to be served from the public folder
app.use(morgan('dev'))
// dev defines concise output that is colored
app.use(express.urlencoded({extended: true}))
app.use(express.json())
// remember to invoke

app.use(
  session({
    secret: process.env.SESSION_SECRET || "insecureSecret",
    store: dbStore,
    resave: false,
    // resave triggers save regardless if session was not modified
    saveUninitialized: false
    // saveUninitialized triggers save regardless if session did not exist
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (error) {
    done(error)
  }
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
      // findById is an unidentified method
      .then(user => done(null, user))
      .catch(done)
})

app.use('/auth', require('./auth'))

app.get('', (req, res, next) => {
  // '' is same as '/'
  // '' is different from '*'
  // '*' matches any and all requests
  // if you were to add <script src='fileThatDoesntExist.js'></script> to index.html
  // you would skip express.static and '*' would match, sending whatever you specified
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app
