const express = require('express')
const router = express.Router()

// add expense
router.get('/new', (req, res) => {
  return res.render('new')
})

// edit expense
router.get('/edit', (req, res) => {
  return res.render('edit')
})

module.exports = router