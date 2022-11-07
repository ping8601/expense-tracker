// require required packages
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

// use body-parser to refine all requests
app.use(express.urlencoded({ extended: true }))

// set template engine
app.engine('hbs', exphbs({
  defaultLayout: 'main', 
  extname: 'hbs', 
  helpers: {if_odd(n){
    if (n % 2 === 0) return false
    else return true 
  }}
}))
app.set('view engine', 'hbs')

// use static files
app.use(express.static('public'))

// use method-override
app.use(methodOverride('_method'))

// set routes
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})