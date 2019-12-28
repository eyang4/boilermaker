const app = require('./app')
const {db} = require('./db')
const PORT = 8080

db.sync({force: true})
  .then(() => {
    app.listen(PORT, () =>
      console.log(`PORT: ${PORT}`)
    )
  })
