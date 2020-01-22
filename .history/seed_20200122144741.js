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
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Mango-600x600.jpg',
    category: 'Fruit',
    stockQuantity: 100
  },
  {
    id: 2,
    name: 'Tomato',
    price: 1.89,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/10000200_16-fresho-tomato-hybrid-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 150
  },
  {
    id: 3,
    name: 'Mushroom',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 200
  },
  {
    id: 4,
    name: 'Chicken',
    price: 7.59,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/chicken-600x600.jpg',
    category: 'Meat',
    stockQuantity: 80
  },
  {
    id: 5,
    name: 'Eggs',
    price: 3.29,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/eggs%20new-600x600.jpg',
    category: 'Dairy',
    stockQuantity: 95
  },
  {
    id: 6,
    name: 'Onions',
    price: 1.29,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-onion-red-v-1-kg-1-600x600.png',
    category: 'Vegetable',
    stockQuantity: 125
  },
  {
    id: 7,
    name: 'Garlic',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Garlic-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 190
  },
  {
    id: 8,
    name: 'Potato',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Potato1-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 240
  },
  {
    id: 9,
    name: 'Beet Root',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-cut-beetroot-600x600.gif',
    category: 'Vegetable',
    stockQuantity: 60
  },
  {
    id: 10,
    name: 'Sweet Corn',
    price: 0.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/sweet%20corn-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 80
  },
  {
    id: 11,
    name: 'Sweet Potato',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Beauregard-Sweet-Potato_0-600x600.png',
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
    name: 'Onion and mushrooms omelette',
    description:
      'Crack the eggs into a bowl and add a pinch of salt. Whisk until well beaten, then set aside. Sauté the onion until soft and translucent, about 3 to 5 minutes. Add the mushrooms and sauté until they release their juices and become soft, about 3 minutes more. Transfer the onions and mushrooms to bowl and set aside.Pour in the beaten eggs. When the edges begin to set, run a silicone or rubber spatula around the circumference, pushing the edge aside slightly, and tilting the pan to let any uncooked egg run under the omelet. When the surface of the egg is almost entirely set, top one side of the omelet with the reserved sautéed mushrooms and onions. Sprinkle evenly with cheese, if using. Use a spatula to carefully fold the other side of the omelet over the filling. Gently flip the stuffed omelet and cook for another minute, until the cheese melts and the egg is set. Transfer to a plate and garnish with freshly snipped chives, if desired. Serve immediately.',
    imageURL:
      'https://www.seriouseats.com/recipes/images/2016/04/20160418-american-omelet-ham-and-cheese-21-1500x1125.jpg'
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
