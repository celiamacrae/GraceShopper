const router = require('express').Router()
const {User, activeCart} = require('../db/models')
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

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const cart = await activeCart.findAll({
      where: {cartOwner: userId}
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId/cart/remove', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await activeCart.destroy({
      where: {cartOwner: userId}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
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
