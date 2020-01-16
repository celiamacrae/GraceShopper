const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 100000
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  imgSrc: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
    validate: {
      notEmpty: false
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT
    // validate: {
    //   notEmpty: false,
    // }
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: false
    }
  }
})

module.exports = Product
