const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({})
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findAll({
      where: {id: userId}
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    if (user === null) {
      res.sendStatus(404)
    }
    if (req.body.oldPassword !== undefined) {
      if (user.correctPassword(req.body.oldPassword))
        await user.update(req.body)
    } else await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// Get user order history
router.get('/:userId/orderhistory', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userId},
      include: [Product]
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      include: [Product]
    })
    //sending cart items
    res.json(order[0].dataValues.products)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart/remove', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await Order.destroy({
      where: {
        userId: userId,
        status: 'pending'
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

///update the current pending order for a user or add a pending order
router.put('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    let user = await User.findOne({where: {id: userId}})

    //find or create pending order (active cart) for the user
    let data = await Order.findOrCreate({
      where: {
        userId: userId,
        status: 'pending'
      },
      defaults: {
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        address: user.dataValues.address,
        paymentInformation: user.dataValues.paymentInformation,
        email: user.dataValues.email
      }
    })
    //getting active order id
    const currentOrderId = parseInt(data[0].dataValues.id, 10)

    //getting active order in right format
    const currentOrder = await Order.findByPk(currentOrderId)

    //using a magic method to fill join table (product)
    await currentOrder.addProduct([req.body.id])

    const productInOrder = await ProductOrder.findOne({
      where: {
        productId: req.body.id,
        orderId: currentOrderId
      }
    })

    //increasing a quantity per product
    if (productInOrder.dataValues.quantity === null) {
      await productInOrder.update({quantity: 1})
    } else {
      let quantity = productInOrder.dataValues.quantity
      await productInOrder.update({
        quantity: ++quantity
      })
    }
    res.json(data)
  } catch (error) {
    next(error)
  }
})

// add an order to order history
// link for guest checkout /guest/checkout
// userId for guest in orders table equals NULL
router.post('/:userId/checkout', async (req, res, next) => {
  try {
    const userId = req.params.userId
    let data = await Order.create(req.body)
    if (typeof userId === Number) data.userId = userId
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await User.destroy({
      where: {userId}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
