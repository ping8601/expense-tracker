const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
    badRequestMessage: '請填入信箱及密碼！'
  })
)

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已成功登出。')
  return res.redirect('/users/login')
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有的欄位都是必填！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length !== 0) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個Email已經註冊過了！' })
        return res.render('register', { name, email, password, confirmPassword, errors })
      } else {
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash =>
            User.create({
              name,
              email,
              password: hash
            }))
          .then(() => {
            req.flash('success_msg', '已成功註冊！')
            res.redirect('/users/login')
          })
          .catch(error => console.error(error))
      }
    })
    .catch(error => console.error(error))
})

module.exports = router
