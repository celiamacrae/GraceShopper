const Sequelize = require('sequelize')
const db = require('../db')

const activeCart = db.define('activeCart', {})

module.exports = activeCart
