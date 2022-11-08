const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// index page
router.get('/', (req, res) => {
  const categories = []
  const selectedCategory = req.query.selectedCategory
  Category.find()
    .lean()
    .then(items => items.forEach(item => {
      if (item.name === selectedCategory) {
        item.selected = true
      }
      categories.push(item)
    }))
    .then (() => {
      return Record.find(selectedCategory === "" || !selectedCategory ?  {} : { category: selectedCategory })
        .lean()
        .sort({ date: 'desc'})
        .then(records => {
          let total = 0
          records.forEach(record => {
            total += record.amount
            record.category = categories.find(category => category.name === record.category).icon
            record.date = moment(record.date).format('YYYY/MM/DD')
          })
          return res.render('index', { records, total, categories })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

module.exports = router