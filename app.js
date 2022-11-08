// require required packages
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

// use body-parser to refine all requests
app.use(express.urlencoded({ extended: true }))

// set template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
    if_odd (n) {
      if (n % 2 === 0) return false
      else return true
    }
  }
}))
app.set('view engine', 'hbs')

// use session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// use passport
usePassport(app)

// use static files
app.use(express.static('public'))

// use method-override
app.use(methodOverride('_method'))

// add a middleware to add variables for view engine
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  return next()
})

// set routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
