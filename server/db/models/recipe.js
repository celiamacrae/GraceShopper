const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  imageURL: {
    type: Sequelize.STRING,
    defaultValue:
      'https://homemadeandyummy.com/wp-content/uploads/2019/08/lolgoagain.png'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  time: {
    type: Sequelize.STRING,
    defaultValue: '15 min'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Recipe
