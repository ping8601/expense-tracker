if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')

const categories = [{
  name: '家居物業',
  icon: 'fa-house'
}, {
  name: '交通出行',
  icon: 'fa-van-shuttle'
}, {
  name: '休閒娛樂',
  icon: 'fa-face-grin-beam'
}, {
  name: '餐飲食品',
  icon: 'fa-utensils'
}, {
  name: '其他',
  icon: 'fa-pen'
}]

db.once('open', () => {
  return Category.create(categories)
    .then(() => {
      console.log('Category seeder done!')
      process.exit()
    })
    .catch(error => console.error(error))
})
