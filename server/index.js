const app = require('./app')
const {db} = require('./db')

require('express')().use(app)

db.sync()
  .then(() => {app.listen(8080, () => console.log('PORT: 8080'))})

