const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/boilermaker', {logging: false})
// Heroku environment will have a DATABASE_URL but local development wont

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

module.exports = db
