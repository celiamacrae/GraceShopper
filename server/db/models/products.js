const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  imgSrc: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
})
Product.prototype.getQuantity = function() {
  switch (this.category) {
    case 'meat':
      return this.quantity + '/lb'
    case 'fruit_big':
      return this.quantity + '/count'
    case 'vegetable_big':
      return this.quantity + '/count'
    default:
      return this.quantity + '/box'
  }
}
module.exports = Product
