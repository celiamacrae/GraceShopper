const router = require('express').Router()
const {Product, ActiveCart} = require('../db/models')
module.exports = router

router.get('/:userId/cart', async (req, res, next) => {
  try {
    const userId = req.params.userId
    const cart = await ActiveCart.findOne({
      where: {userId: userId},
      include: [Product]
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

//seed activeCart table with products in local cart when user is logging out
router.post('/:userId/cart', async (req, res, next) => {
  try {
    //user id
    const userId = req.params.userId

    //find or create an active cart for the user
    let data = await ActiveCart.findOrCreate({
      where: {
        userId: userId
      }
    })

    //getting active cart id
    const currentCartId = parseInt(data[0].dataValues.id, 10)

    //getting active cart in right format
    const currentCart = await ActiveCart.findByPk(currentCartId)

    //getting all id's for every product in local cart
    const productsIdArray = req.body.products.map(product => product.id)

    //using a magic method to fill join table (CartProducts)
    await currentCart.addProduct(productsIdArray)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/cart/remove', async (req, res, next) => {
  try {
    const userId = req.params.userId
    await ActiveCart.destroy({
      where: {userId: userId}
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
