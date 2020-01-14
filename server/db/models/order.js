const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false
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

module.exports = Order
