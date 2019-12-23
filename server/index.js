const express = require('express')
const app = express()

const path = require('path')
app.use(express.static(path.join(__dirname, '../public/')))
// express.static defines the directory on the server to be accessed
// by a request for a specific directory from a client
// if __dirname was not specified, express.static starts at the location node is run from
// and opens us up to errors
// above defines that all files client requests are to be served from the public folder

app.get('', (req, res, next) => {
  // '' is same as '/'
  // '' is different from '*'
  // '*' matches any and all requests
  // if you were to add <script src='fileThatDoesntExist.js'></script> to index.html
  // you would skip express.static and '*' would match, sending whatever you specified
  res.sendFile(path.join(__dirname, '../public/index.html'))
})


app.listen(8080)
