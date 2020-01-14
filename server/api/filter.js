const router = require('express').Router()
const {Product} = require('../db/models')

module.exports = router

router.get('/:category', async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        category: req.params.category
      }
    })
    if (product === null) {
      res.sendStatus(404)
    }
    res.json(product)
  } catch (err) {
    next(err)
  }
})
