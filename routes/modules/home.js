const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')

// index page
router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      let total = 0
      records.forEach(record => {
        total += record.amount
        record.date = moment(record.date).format('YYYY/MM/DD')
      })
      return res.render('index', { records, total })
    })
    .catch(error => console.error(error))
})

module.exports = router