const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'fulfilled']]
    }
  },
  email: {
    type: Sequelize.STRING
  },
  orderInfo: {
    type: Sequelize.TEXT
  }
})
async function findUserId(order) {
  try {
    if (order.email) {
      const user = await User.findOne({
        where: {
          email: order.email
        }
      })
      if (user !== null) order.userId = user.id
    } else {
      order.userId = null
    }
  } catch (err) {
    console.log(err)
  }
}
Order.beforeCreate(findUserId)
Order.beforeUpdate(findUserId)
Order.beforeBulkCreate(order => {
  order.forEach(findUserId)
})
module.exports = Order
