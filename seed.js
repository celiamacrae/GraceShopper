const Sequelize = require('sequelize')
const db = require('./server/db')
const {
  User,
  Product,
  Order,
  ProductOrder,
  Recipe,
  RecipeProduct
} = require('./server/db/models')

const users = [
  {
    firstName: 'guest',
    status: 'user',
    lastName: 'guest',
    address: '',
    email: 'guest@yahoo.com',
    password: '',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  },
  {
    firstName: 'Liana',
    status: 'admin',
    lastName: 'Chan',
    address: '123 Magnolia Ave.,NY 11206',
    email: 'liana.andreea97@yahoo.com',
    password: '123',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  },
  {
    firstName: 'Kiana',
    status: 'admin',
    googleId: '101534905451896274735',
    lastName: 'Wong',
    email: 'kiwongdesigns@gmail.com',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  },
  {
    firstName: 'Paul',
    lastName: 'Chan',
    status: 'user',
    address: '123 Magnolia Ave.,NY 11206',
    email: 'paultonchan@gmail.com',
    password: '123',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  },
  {
    firstName: 'Celia',
    lastName: 'Macrae',
    status: 'user',
    address: '309 E 52nd St., New York, NY 10022',
    email: 'celiamacrae@gmail.com',
    password: '123',
    imageURL:
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/107/profiles/2394/profileImage/avatar-new400.jpg'
  }
]
const products = [
  {
    id: 1,
    name: 'Mango',
    price: 2.59,
    weight: '0.5oz',
    imgSrc: 'https://jackscalisi.com/wp-content/uploads/2020/03/Mango-1.jpg',
    category: 'Fruit',
    stockQuantity: 3
  },
  {
    id: 2,
    name: 'Tomato',
    price: 1.89,
    weight: '0.5oz',
    imgSrc:
      'https://www.shopzonegh.com/wp-content/uploads/2018/06/large-red-cherry-tomato-pepper-joes.jpg',
    category: 'Vegetable',
    stockQuantity: 10
  },
  {
    id: 3,
    name: 'Mushroom',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://5.imimg.com/data5/MB/GA/MY-3035565/fresh-champignon-mushroom-500x500.jpg',
    category: 'Vegetable',
    stockQuantity: 100
  },
  {
    id: 4,
    name: 'Chicken',
    price: 7.59,
    weight: '0.5oz',
    imgSrc:
      'https://img3.exportersindia.com/product_images/bc-full/dir_111/3318737/full-halal-chicken-grade-a-certified-halal-1628356.jpg',
    category: 'Meat',
    stockQuantity: 80
  },
  {
    id: 5,
    name: 'Eggs',
    price: 3.29,
    weight: '0.5oz',
    imgSrc:
      'https://myplanet1051.com/wp-content/uploads/2019/01/bigstock-Brown-egg-on-white-background-27164300.jpg',
    category: 'Dairy',
    stockQuantity: 95
  },
  {
    id: 6,
    name: 'Onions',
    price: 1.29,
    weight: '0.5oz',
    imgSrc:
      'https://target.scene7.com/is/image/Target/GUEST_6e9b6bee-9320-4ddd-ae86-38d6c636ec63?wid=488&hei=488&fmt=pjpeg',
    category: 'Vegetable',
    stockQuantity: 125
  },
  {
    id: 7,
    name: 'Garlic',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.chatelaine.com/wp-content/uploads/2013/10/Bulb-of-garlic-660x658.jpg',
    category: 'Vegetable',
    stockQuantity: 190
  },
  {
    id: 8,
    name: 'Potato',
    price: 2.99,
    weight: '0.5oz',
    imgSrc: 'https://i.redd.it/qi0r0pdbsgs31.jpg',
    category: 'Vegetable',
    stockQuantity: 240
  },
  {
    id: 9,
    name: 'Beet Root',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.znaturalfoods.com/594-large_default/beet-root-powder-organic.jpg',
    category: 'Vegetable',
    stockQuantity: 60
  },
  {
    id: 10,
    name: 'Sweet Corn',
    price: 0.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.thehonestcounter.com/wp-content/uploads/2017/10/Sweet-Corn-1000x1000.jpg?x29720',
    category: 'Vegetable',
    stockQuantity: 80
  },
  {
    id: 11,
    name: 'Sweet Potato',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.lcsupplies.co.uk/pub/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/1/4/147071.jpg',
    category: 'Vegetable',
    stockQuantity: 165
  },
  {
    id: 12,
    name: 'Pineapple',
    price: 5.99,
    weight: '1.5lb',
    imgSrc: 'https://www.tanny.io/my/wp-content/uploads/2019/03/pineapple.jpg',
    category: 'Fruit',
    stockQuantity: 50
  },
  {
    id: 13,
    name: 'Banana',
    price: 2.99,
    weight: '2lb',
    imgSrc:
      'https://www.tanny.io/my/wp-content/uploads/2019/04/CavendishBanana.jpg',
    category: 'Fruit',
    stockQuantity: 100
  },
  {
    id: 14,
    name: 'Pomegranate',
    price: 9.99,
    weight: '0.5lb',
    imgSrc:
      'https://www.tanny.io/my/wp-content/uploads/2019/06/Pomegranate.jpg',
    category: 'Fruit',
    stockQuantity: 20
  },
  {
    id: 16,
    name: 'Kiwi',
    price: 8.99,
    weight: '1lb',
    imgSrc: 'https://www.tanny.io/my/wp-content/uploads/2019/06/Kiwi.jpg',
    category: 'Fruit',
    stockQuantity: 30
  },
  {
    id: 17,
    name: 'Shiitake Mushroom',
    price: 12.99,
    weight: '1lb',
    imgSrc:
      'https://www.tanny.io/my/wp-content/uploads/2019/03/shiitake-mushroom.jpg',
    category: 'Vegetable',
    stockQuantity: 80
  },
  {
    id: 18,
    name: 'Portobello Mushroom',
    price: 9.99,
    weight: '2lb',
    imgSrc:
      'https://www.tanny.io/my/wp-content/uploads/2019/03/Portabella-Mushroom.jpg',
    category: 'Vegetable',
    stockQuantity: 120
  },
  {
    id: 19,
    name: 'Seasonal Veggie Box',
    price: 31.99,
    weight: '6lb',
    imgSrc: 'https://www.tanny.io/my/wp-content/uploads/2019/04/vegeBox.png',
    category: 'Vegetable',
    stockQuantity: 30
  },
  {
    id: 20,
    name: 'Kinoko Mushrooms',
    price: 15.99,
    weight: '0.2lb',
    imgSrc:
      'https://www.tokyobrandhouse.com/wp-content/uploads/2018/06/Kinoko-No-Yama-Chocolate-Biscuits2.jpg',
    category: 'Sweets',
    stockQuantity: 40
  },
  {
    id: 21,
    name: 'Seasonal Fruit Basket',
    price: 25.99,
    weight: '4.5lb',
    imgSrc:
      'https://www.tanny.io/my/wp-content/uploads/2019/05/fruitBasket.jpg',
    category: 'Fruit',
    stockQuantity: 25
  },
  {
    id: 22,
    name: 'Coconut Milk',
    price: 7.99,
    weight: '1.2l',
    imgSrc:
      'https://www.tanny.io/my/wp-content/uploads/2019/08/coconut-milk-fresh-frozen.jpg',
    category: 'Dairy',
    stockQuantity: 80
  },
  {
    id: 23,
    name: 'Angus Beef',
    price: 22.99,
    weight: '2.2lb',
    imgSrc:
      'https://cutpcdnwimages.azureedge.net/images/products/65000/069141-600x600-A.jpg',
    category: 'Meat',
    stockQuantity: 45
  },
  {
    id: 24,
    name: 'Turkey',
    price: 12.99,
    weight: '1.7lb',
    imgSrc:
      'https://cutpcdnwimages.azureedge.net/images/products/55000/056628-600x600-A.jpg',
    category: 'Meat',
    stockQuantity: 70
  },
  {
    id: 25,
    name: 'Milk',
    price: 4.99,
    weight: '1l',
    imgSrc:
      'http://belkysinternationalcuisine.com/wp-content/uploads/2018/07/baso-de-leche-cup-of-milk-600x600.jpg',
    category: 'Dairy',
    stockQuantity: 110
  }
]

// const productOrder = [
//   {
//     productId: 1,
//     quantity: 2,
//     orderId: 2
//   },
//   {
//     productId: 2,
//     quantity: 1,
//     orderId: 2
//   },
//   {
//     productId: 3,
//     quantity: 2,
//     orderId: 1
//   },
//   {
//     productId: 6,
//     quantity: 1,
//     orderId: 1
//   },
//   {
//     productId: 3,
//     quantity: 1,
//     orderId: 4
//   },
//   {
//     productId: 1,
//     quantity: 1,
//     orderId: 5
//   },
//   {
//     productId: 1,
//     quantity: 1,
//     orderId: 3
//   }
// ]

const recipies = [
  {
    id: 1,
    name: 'Onion and mushrooms omelette',
    description:
      ' Crack the eggs into a bowl and add a pinch of salt. Whisk until well beaten,then set aside. Sauté the onion until soft and translucent, about 3 to 5 minutes. Add the mushrooms and sauté until they release their juices and become soft, about 3 minutes more. Transfer the onions and mushrooms to bowl and set aside.Pour in the beaten eggs. When the edges begin to set, run a silicone or rubber spatula around the circumference, pushing the edge aside slightly, and tilting the pan to let any uncooked egg run under the omelet. When the surface of the egg is almost entirely set, top one side of the omelet with the reserved sautéed mushrooms and onions. Sprinkle evenly with cheese, if using. Use a spatula to carefully fold the other side of the omelet over the filling. Gently flip the stuffed omelet and cook for another minute, until the cheese melts and the egg is set. Transfer to a plate and garnish with freshly snipped chives, if desired. Serve immediately.',
    imageURL:
      'https://www.seriouseats.com/recipes/images/2016/04/20160418-american-omelet-ham-and-cheese-21-1500x1125.jpg'
  },
  {
    id: 2,
    name: 'Mushroom Soup',
    description: ` To large stock pot, add 1 tbsp butter with diced onion and celery root (or celery). Stir over medium heat until vegetables sweat and soften, approx. 6-8 minutes. Add mushrooms and dried onions and stir to coat. Continue cooking for approx. 3 minutes to soften mushrooms.
      Add roasted garlic, dried herbs, nutmeg, stock and sherry.
      Gently simmer for 40 minutes.
      When soup is nearly done, lightly sauté sliced oyster and shiitake mushrooms in butter and set aside.
      Remove soup from heat and puree using an immersion blender or blender of your choice.
      Serve in bowls and top with oyster and shiitake mushrooms.`,
    imageURL:
      'https://producemadesimple.ca/wp-content/uploads/2019/01/Maren.can_.MUSHROOMS-8-600x450.jpg'
  },
  {
    id: 3,
    name: 'Baked lemon herb chicken & potatoes',
    description: ` Preheat oven to 400 degrees and grease a large baking dish.
      Season chicken on both sides with salt and pepper to taste. Arrange chicken and chopped potatoes on baking dish. Thinly slice one lemon and slide lemon slices between some of the potatoes and chicken.
      Whisk together melted butter, Italian seasoning, garlic powder, onion powder, lemon juice (from remaining two lemons), and butter. Drizzle mixture over chicken and potatoes.
      Bake for 25-30 minutes until chicken is cooked through and potatoes are fork-tender. Garnish with fresh herbs if desired and serve.`,
    imageURL:
      'https://latourangelle.com/wp-content/uploads/cc_resize/shutterstock_260238005-600x450.jpg'
  },
  {
    id: 4,
    name: 'Maple Syrup Fruit Dip',
    description: ` In a bowl, put the maple spread, maple sugar or maple syrup.
      Gradually add the sour cream and stir until you have obtained a smooth mixture.
      Sprinkle with cinnamon and refrigerate until serving time.
      Try it with fresh fruit (apples, pears, pineapple, peaches, strawberries, orange, etc.), cookies, cake, etc.`,
    imageURL:
      'https://maplefromquebec.ca/uploads/2018/09/recette-trempette-pour-fruits-a-lerable-600x450.jpg'
  }
]

const recipeProduct = [
  {
    recipeId: 1,
    productId: 3,
    quantity: 1,
    weight: '0.3oz'
  },
  {
    recipeId: 1,
    productId: 5,
    quantity: 1,
    weight: '3'
  },
  {
    recipeId: 1,
    productId: 6,
    quantity: 1,
    weight: '0.2oz'
  },
  {
    recipeId: 1,
    productId: 2,
    quantity: 1,
    weight: '0.2oz'
  },
  {
    recipeId: 2,
    productId: 3,
    quantity: 2,
    weight: '0.1oz'
  },
  {
    recipeId: 2,
    productId: 25,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 2,
    productId: 7,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 2,
    productId: 6,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 3,
    productId: 4,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 3,
    productId: 8,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 3,
    productId: 7,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 4,
    productId: 16,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 4,
    productId: 12,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 4,
    productId: 1,
    quantity: 1,
    weight: '0.1oz'
  },
  {
    recipeId: 4,
    productId: 13,
    quantity: 1,
    weight: '0.1oz'
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(pr => Product.create(pr))).then(() =>
      // Promise.all(orders.map(order => Order.create(order))).then(() =>
      //   Promise.all(productOrder.map(po => ProductOrder.create(po))).then(() =>
      Promise.all(recipies.map(recipe => Recipe.create(recipe))).then(() =>
        Promise.all(recipeProduct.map(rp => RecipeProduct.create(rp)))
      )
    )
  )
//   )
// )

// .then(() =>
//   // Promise.all(orders.map(order => Order.create(order))).then(() =>
//     Promise.all(productOrder.map(po => ProductOrder.create(po)))
//   )
// )
const main = () => {
  console.log('Syncing db...')
  db
    .sync({force: true})
    .then(() => {
      console.log('Seeding databse...')
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      db.close()
      return null
    })
}
main()
