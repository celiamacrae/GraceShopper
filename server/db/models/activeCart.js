const Sequelize = require('sequelize')
const db = require('../db')

const ActiveCart = db.define('activeCart', {})

module.exports = ActiveCart
