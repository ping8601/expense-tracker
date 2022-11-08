const express = require('express')
const router = express.Router()

const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then( user => {
      if (user) {
        console.log('user already exists!')
        return res.render('register', { name, email, password, confirmPassword })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/users/login'))
          .catch(error => console.error(error))
      }
    })
    .catch(error => console.error(error))
})

// logout

module.exports = router