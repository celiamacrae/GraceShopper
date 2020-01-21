const router = require('express').Router()
const {User, Order, Product, ProductOrder} = require('../db/models')
module.exports = router

router.get('/:userId/cart', async (req, res, next) => {
  try {
    let user = await User.findOne({where: {id: req.params.userId}})
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'pending',
        email: user.email
      },
      include: [Product]
    })

    //sending cart items
    res.json(order[0].dataValues.products)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const order = await Order.findOne({
      where: {
        userId: userId,
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
        status: 'pending',
        email: user.email
      }
      // },
      // defaults: {
      //   firstName: user.dataValues.firstName,
      //   lastName: user.dataValues.lastName,
      //   address: user.dataValues.address,
      //   paymentInformation: user.dataValues.paymentInformation,
      //   email: user.dataValues.email
      // }
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

router.put('/:userId/cart/fulfilled', async (req, res, next) => {
  try {
    const userId = req.params.userId
    if (userId) {
      //0 differientates between guest and user
      let user = await User.findOne({where: {id: userId}})
      let data = await Order.findOrCreate({
        where: {
          email: user.email,
          userId: userId,
          status: 'pending'
        }
      })
      const currentOrderId = parseInt(data[0].dataValues.id, 10)
      const currentOrder = await Order.findByPk(currentOrderId)
      ///Update current order to fulfilled with info
      await currentOrder.update({status: 'fulfilled', orderInfo: req.body.info})

      ///trying to get guest product orders on database for inventory reference
      for (let i = 0; i < req.body.items.length; i++) {
        await currentOrder.addProduct([req.body.items[i].id])

        const productInOrder = await ProductOrder.findOne({
          where: {
            productId: req.body.items[i].id,
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
      }

      res.end()
    }
  } catch (error) {
    next(error)
  }
})
