if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_RECORDS = [
  {
    name: '午餐',
    date: '2022-11-10',
    category: '餐飲食品',
    amount: 150
  }, {
    name: '搭Uber',
    date: '2022-11-01',
    category: '交通出行',
    amount: 210
  }, {
    name: '看電影',
    date: '2022-10-28',
    category: '休閒娛樂',
    amount: 250
  }

]

db.once('open', () => {
  const categories = []
  return Category.find()
    .lean()
    .then(items => categories.push(...items))
    .then(() => { 
      return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(SEED_USER.password, salt))
        .then(hash => User.create({
          name: SEED_USER.name,
          email: SEED_USER.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(
            {length: 3},
            (_, i) => Record.create({
              name: SEED_RECORDS[i].name,
              date: SEED_RECORDS[i].date,
              categoryId: categories[categories.findIndex(item => item.name === SEED_RECORDS[i].category)]._id,
              amount: SEED_RECORDS[i].amount,
              userId
            })
          ))
        })
        .then(() => {
          console.log('Record seeder done!')
          process.exit()
        })
        .catch(error => console.error(error))
    })

})