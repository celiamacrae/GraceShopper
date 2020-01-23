const router = require('express').Router()
const {Product, Recipe, RecipeProduct} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const recipies = await Recipe.findAll({include: [Product]})
    res.json(recipies)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    })
    if (recipe === null) res.sendStatus(404)
    res.json(recipe)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.id
      }
    })
    if (recipe === null) res.sendStatus(404)
    await recipe.destroy()
    const recipies = await Recipe.findAll()
    res.send(recipies)
  } catch (error) {
    next(error)
  }
})

// req.body.recipe is the object of new recipe
// req.body.ids is an array of all ingredients in the recipe
// req.body.weight
// req.body.quantity
router.put('/add', async (req, res, next) => {
  try {
    console.log('BODYYYY ', req.body.ingredients)
    const recipe = await Recipe.create({
      name: req.body.recipeName,
      description: req.body.description,
      time: req.body.time,
      imageURL:
        req.body.imageURL === ''
          ? 'https://homemadeandyummy.com/wp-content/uploads/2019/08/lolgoagain.png'
          : req.body.imageURL
    })
    if (recipe === null) res.sendStatus(404)
    const currentRecipeId = parseInt(recipe.dataValues.id, 10)
    const currentRecipe = await Recipe.findByPk(currentRecipeId)
    const idsForIngredients = req.body.ingredients.map(
      ingredient => ingredient.id
    )
    await currentRecipe.addProduct(idsForIngredients)
    //adding quantity and weight for RecipeProduct join table
    req.body.ingredients.map(async product => {
      const productInRecipe = await RecipeProduct.findOne({
        where: {
          productId: product.id,
          recipeId: recipe.dataValues.id
        }
      })
      console.log('productInRecipe', productInRecipe)
      await productInRecipe.update({
        quantity: product.quantity,
        weight: product.weight
      })
    })

    const data = await Recipe.findAll({include: [Product]})
    res.json(data)
  } catch (error) {
    next(error)
  }
})

//Update the recipe
router.post('/:id', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.id
      }
    })
    if (recipe === null) res.sendStatus(404)
    await recipe.update({
      name: req.body.name,
      description: req.body.description,
      time: req.body.time,
      imageURL: req.body.imageURL
    })
    const currentRecipeId = parseInt(recipe.dataValues.id, 10)
    const currentRecipe = await Recipe.findByPk(currentRecipeId)
    const idsForEngredients = req.body.ingredients.map(
      ingredient => ingredient.id
    )
    await currentRecipe.addProduct(idsForEngredients)
    //adding quantity and weight for RecipeProduct join table
    req.body.ingredients.map(async product => {
      const productInRecipe = await RecipeProduct.findOne({
        where: {
          productId: product.id,
          recipeId: recipe.dataValues.id
        }
      })
      await productInRecipe.update({
        quantity: product.quantity,
        weight: product.weight
      })
    })

    const data = await Recipe.findAll({include: [Product]})
    res.json(data)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body)
    res.json(recipe)
  } catch (error) {
    next(error)
  }
})
