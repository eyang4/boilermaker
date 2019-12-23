const app = require('./app')
const db = require('./db')

db.sync()
  .then(() => {app.listen(8080)})

