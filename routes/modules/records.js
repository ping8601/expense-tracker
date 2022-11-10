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
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const categories = []
  const errors = []
  return Category.find()
    .lean()
    .then(items => items.forEach(item => categories.push(item)))
    .then(() => {
      if (!name || !date || category === '' || !amount) {
        errors.push({ message: '所有欄位都是必填！' })
      }
      if (errors.length !== 0) {
        return res.render('new', { errors, name, date, category, amount, categories })
      }
      categories[categories.findIndex(item => item.name.toString() === category)].selected = true
      return Record.create({
        name,
        date,
        categoryId: categories[categories.findIndex(item => item.selected === true)]._id,
        amount,
        userId
      })
        .then(item => {
          req.flash('success_msg', `已成功新增：${item.name}`)
          return res.redirect('/')
        })
        .catch(error => console.error(error))
    }
    )
    .catch(error => console.error(error))
})

// edit expense
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const categories = []
  return Category.find()
    .lean()
    .then(items => items.forEach(item => categories.push(item)))
    .then(() => {
      return Record.findOne({ _id, userId })
        .lean()
        .then(record => {
          const date = moment(record.date).format('YYYY-MM-DD')
          categories[categories.findIndex(category => category._id.toString() === record.categoryId.toString())].selected = true
          record.date = date
          return res.render('edit', { record, categories })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const categories = []
  const errors = []
  const _id = req.params.id
  return Category.find()
    .lean()
    .then(items => items.forEach(item => categories.push(item)))
    .then(() => {
      categories[categories.findIndex(item => item.name.toString() === category)].selected = true
      if (!name || !date || category === '' || !amount) {
        errors.push({ message: '所有欄位都是必填！' })
      }
      if (errors.length !== 0) {
        return res.render('edit', { errors, name, date, category, amount, categories, _id })
      }
      return Record.findOne({ _id, userId })
        .then(record => {
          record.name = name
          record.date = date
          record.categoryId = categories[categories.findIndex(item => item.selected === true)]._id
          record.amount = amount
          return record.save()
        })
        .then(item => {
          req.flash('success_msg', `已成功修改：${item.name}`)
          return res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
})

// delete expense
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      if (record !== null) {
        return record.remove()
      }
    })
    .then(item => {
      req.flash('error', `已成功刪除：${item.name}`)
      return res.redirect('/')
    })
    .catch(error => console.error(error))
})

module.exports = router
