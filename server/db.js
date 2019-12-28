const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {logging: false})
// Heroku environment will have a DATABASE_URL but local development wont
const crypto = require('crypto')
/*
hashing and salting:
you do not send a plaintext password through the internet
you send a hashed password
that hashed password is stored on the database during signup
on login, you send a hashed password
if that password matches the one in the database, you are authenticated

salting obscures the hashing
adds an additional random factor
instead of sending a hashed password during signup
generate a long salt and add the password to the end, then hash
send the salt and hash to the database
on login, retrieve salt, add password to the end, then hash and send
if hash matches the one in the database, authenticate

"always hash on the server" - in case you receive plaintext
*/

const User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    // allowNull: false,
    validate: {
      // notEmpty: true
      isEmail: true
    }
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  salt: {
    // salt is initially null
    type: Sequelize.TEXT,
    // allowNull: false,
    validate: {
      // notEmpty: true
    }
  }
}, {
  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword
  }
})

User.prototype.correctPassword = function(providedPass) {
  // returns if hashed providedPass matches hash
  return User.encryptPassword(providedPass, this.salt) === this.password
}

// sanitize method that trims the information sent to the client, uses lodash module

User.generateSalt = function() {
  // generates salt whenever called
  return crypto.randomBytes(32).toString('base64')
  // generates 32 bytes of information and converts it using base64, turning it into valid ascii
}

User.encryptPassword = function(password, salt) {
  // generates hash whenever called
  return crypto.createHash('sha256')
               .update(password)
               .update(salt)
               .digest('hex')
}

function setSaltAndPassword (user) {
  if (user.changed('password')) {
    // checks if the value for field password is different from previousDataValues
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

const Model1 = db.define('Model1', {
  str: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  txt: Sequelize.TEXT,
  numArr: Sequelize.ARRAY(Sequelize.DOUBLE),
  bool: Sequelize.BOOLEAN
})

const Model2 = db.define('Model2', {
  str: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  txt: Sequelize.TEXT,
  numArr: Sequelize.ARRAY(Sequelize.DOUBLE),
  bool: Sequelize.BOOLEAN
})

Model1.hasMany(Model2)
Model2.belongsTo(Model1)

module.exports = {
  db,
  User,
  Model1,
  Model2
}
// placed at the end, after all variables are initialized
