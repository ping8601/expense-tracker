const express = require('express')
const router = express.Router()

//login
router.get('/login', (req, res) => {
  res.render('login')
})

//logout

module.exports = router