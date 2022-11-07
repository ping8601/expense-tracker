// require required packages
const express = require('express')
const exphbs = require('express-handlebars')

const routes = require('./routes')

const app = express()
const port = 3000

// set template engine
app.engine('hbs', exphbs({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

// use static files
app.use(express.static('public'))

// set routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})