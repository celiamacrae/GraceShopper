const Sequelize = require('sequelize')
const db = require('../db')

const RecipeProduct = db.define('recipeProduct', {
  quantity: Sequelize.INTEGER,
  weight: Sequelize.STRING
})

module.exports = RecipeProduct
