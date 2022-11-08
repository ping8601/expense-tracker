const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// add expense
router.get('/new', (req, res) => {
  const categories = []
  return Category.find()
    .lean()
    .then(items => items.forEach(item => categories.push(item)))
    .then(() => res.render('new', { categories }))
    .catch(error => console.error(error))
})
router.post('/', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({
    name,
    date,
    category,
    amount
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// edit expense
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const categories = []
  return Category.find()
    .lean()
    .then(items => items.forEach(item => categories.push(item)))
    .then(() => {
      return Record.findById(_id)
        .lean()
        .then(record => {
          const date = moment(record.date).format('YYYY-MM-DD')
          record.date = date
          res.render('edit', { record, categories })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})
router.put('/:id', (req, res) => {
  const { name, date, category, amount } = req.body
  const _id = req.params.id
  return Record.findById(_id)
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// delete expense
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findById(_id)
    .then(record => {
      if (record !== null) {
        return record.remove()
      }
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
