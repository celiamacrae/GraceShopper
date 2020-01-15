const db = require('../db')
const Sequelize = require('sequelize')

const CartProduct = db.define('CartProduct', {
  activeCartId: Sequelize.INTEGER,
  productId: Sequelize.INTEGER
})

module.exports = CartProduct
