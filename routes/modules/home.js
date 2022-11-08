const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const categories = {}

// index page
router.get('/', (req, res) => {
  Category.find()
    .then(items => items.forEach(item => categories[item.name] = item.icon))
    .then (() => {
      Record.find()
        .lean()
        .then(records => {
          let total = 0
          records.forEach(record => {
            total += record.amount
            record.category = categories[record.category]
            record.date = moment(record.date).format('YYYY/MM/DD')
          })
          return res.render('index', { records, total, categories: Object.keys(categories) })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router