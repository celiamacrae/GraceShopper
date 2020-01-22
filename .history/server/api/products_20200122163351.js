const router = require('express').Router()
const {Product} = require('../db/models')

module.exports = router
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    if (product === null) {
      res.sendStatus(404)
    }
    res.status(200)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    if (product === null) {
      res.sendStatus(404)
    }
    await product.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      }
    })
    if (product === null) {
      res.sendStatus(404)
    }
    await product.update(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const data = await Product.create(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})
