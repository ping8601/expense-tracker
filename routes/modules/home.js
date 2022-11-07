const express = require('express')
const moment = require('moment')
const router = express.Router()

const Record = require('../../models/record')
const CATEGORY = {
  家居物業: "fa-house",
  交通出行: "fa-van-shuttle",
  休閒娛樂: "fa-face-grin-beam",
  餐飲食品: "fa-utensils",
  其他: "fa-pen"
}

// index page
router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      let total = 0
      records.forEach(record => {
        total += record.amount
        record.category = CATEGORY[record.category]
        record.date = moment(record.date).format('YYYY/MM/DD')
      })
      return res.render('index', { records, total })
    })
    .catch(error => console.error(error))
})

module.exports = router