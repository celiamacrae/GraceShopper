const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      include: [Product]
    })
    if (order)
      //sending cart items
      res.json(order[0].dataValues.products)
    else {
      let user = await User.findOne({where: {id: req.params.userId}})
      const cart = await Order.create({
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        address: user.dataValues.address,
        paymentInformation: user.dataValues.paymentInformation,
        email: user.dataValues.email,
        userId: req.params.userId,
        status: 'pending'
      })
      res.sendStatus(cart)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'pending'
      },
      include: [
        {
          model: Product,
          where: {
            id: req.body.id
          }
        }
      ]
    })
    const productOrder = await ProductOrder.findOne({
      where: {
        productId: req.body.id,
        orderId: order.dataValues.id
      }
    })

    if (productOrder.dataValues.quantity > 1) {
      let quantity = productOrder.dataValues.quantity
      quantity -= 1
      await productOrder.update({
        quantity: quantity
      })
      //find all products to get a quantity property
      const product = await Order.findOrCreate({
        where: {
          userId: userId,
          status: 'pending'
        },
        include: [Product]
      })
      res.json(product[0].dataValues.products).end()
    } else if (productOrder.dataValues.quantity === 1) {
      await ProductOrder.destroy({
        where: {
          orderId: order.dataValues.id,
          productId: req.body.id
        }
      })
      //find all products to get a quantity property
      const product = await Order.findOrCreate({
        where: {
          userId: userId,
          status: 'pending'
        },
        include: [Product]
      })

      res.json(product[0].dataValues.products).end()
    } else {
      console.error('Could not find product')
      res.sendStatus(404)
    }
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
      let quantity = productInOrder.dataValues.quantity + 1
      await productInOrder.update({
        quantity: quantity
      })
    }

    //find all products to get a quantity property
    const product = await Order.findAll({
      where: {
        userId: userId,
        status: 'pending'
      },
      include: [Product]
    })

    res.json(product[0].dataValues.products)
  } catch (error) {
    next(error)
  }
})
