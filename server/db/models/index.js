const User = require('./user')
const Product = require('./products')
const Order = require('./order')
const ActiveCart = require('./activeCart')

///ASSOCIATIONS HERE:
User.hasOne(ActiveCart)
ActiveCart.belongsTo(User)

Order.belongsTo(User)
User.hasMany(Order)

ActiveCart.belongsToMany(Product, {through: 'CartProducts'})
Product.belongsToMany(ActiveCart, {through: 'CartProducts'})

Product.belongsToMany(Order, {through: 'ProductOrders'})
Order.belongsToMany(Product, {through: 'ProductOrders'})

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Product,
  Order,
  ActiveCart
}
