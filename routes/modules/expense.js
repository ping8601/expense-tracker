const express = require('express')
const router = express.Router()

// add expense
router.get('/new', (req, res) => {
  return res.render('new')
})

module.exports = router