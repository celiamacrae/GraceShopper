const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('ProductOrder', {
  quantity: Sequelize.INTEGER
})

module.exports = ProductOrder
