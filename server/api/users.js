const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
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
    await user.update(req.body)
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
