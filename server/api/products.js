const router = require('express').Router()
const {Product} = require('../db/models')

module.exports = router
function auth(req, res, next) {
  if (req.session.passport) {
    const userId = req.session.passport.user
    if (userId !== 1) res.send('Not allowed')
    next()
  } else {
    res.send('Not allowed')
  }
}
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
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
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', auth, async (req, res, next) => {
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

router.post('/:id', auth, async (req, res, next) => {
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

router.put('/', auth, async (req, res, next) => {
  try {
    const data = await Product.create(req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
})
