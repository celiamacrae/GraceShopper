const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'fulfilled']]
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  paymentInformation: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   isCreditCard: true
    // }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})
async function findUserId(order) {
  try {
    const user = await User.findOne({
      where: {
        email: order.email
      }
    })
    if (user !== null) order.userId = user.id
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
