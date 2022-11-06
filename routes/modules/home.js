const express = require('express')
const router = express.Router()

// indes page
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router