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
    name: 'Mango',
    price: 2.59,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Mango-600x600.jpg',
    category: 'fruit',
    stockQuantity: 100
  },
  {
    name: 'Tomato',
    price: 1.89,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/10000200_16-fresho-tomato-hybrid-600x600.jpg',
    category: 'vegetable',
    stockQuantity: 150
  },
  {
    name: 'Mushroom',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
    category: 'vegetable',
    stockQuantity: 200
  },
  {
    name: 'Chicken',
    price: 7.59,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/chicken-600x600.jpg',
    category: 'meat',
    stockQuantity: 80
  },
  {
    name: 'Eggs',
    price: 3.29,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/eggs%20new-600x600.jpg',
    category: 'dairy',
    stockQuantity: 95
  },
  {
    name: 'Onions',
    price: 1.29,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-onion-red-v-1-kg-1-600x600.png',
    category: 'Vegetable',
    stockQuantity: 125
  },
  {
    name: 'Garlic',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Garlic-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 190
  },
  {
    name: 'Potato',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Potato1-600x600.jpg',
    category: 'Vegetable',
    stockQuantity: 240
  },
  {
    name: 'Beet Root',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-cut-beetroot-600x600.gif',
    category: 'Big_Vegetable',
    stockQuantity: 60
  },
  {
    name: 'Sweet Corn',
    price: 0.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/sweet%20corn-600x600.jpg',
    category: 'Big_Vegetable',
    stockQuantity: 80
  },
  {
    name: 'Sweet Potato',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Beauregard-Sweet-Potato_0-600x600.png',
    category: 'Big_Vegetable',
    stockQuantity: 165
  }
]
const orders = [
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Paul',
    lastName: 'Chan',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'paultonchan@gmail.com'
  },
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Liana',
    lastName: 'Chan',
    address: '123 Magnolia Ave.,NY 11206',
    paymentInformation: '1234 5678 9012 3456',
    email: 'liana.andreea97@yahoo.com'
  },
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Celia',
    lastName: 'Macrae',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celiamacrae@gmail.com'
  },
  {
    date: '2015-03-09 16:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Celia',
    lastName: 'Macrae',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celiamacrae@gmail.com'
  },
  {
    date: '2015-01-09 16:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Celia',
    lastName: 'Macrae',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celiamacrae@gmail.com'
  }
]
const productOrder = [
  {
    productId: 1,
    quantity: 2,
    orderId: 2
  },
  {
    productId: 2,
    quantity: 1,
    orderId: 2
  },
  {
    productId: 3,
    quantity: 2,
    orderId: 1
  },
  {
    productId: 6,
    quantity: 1,
    orderId: 1
  },
  {
    productId: 3,
    quantity: 1,
    orderId: 4
  },
  {
    productId: 1,
    quantity: 1,
    orderId: 5
  },
  {
    productId: 1,
    quantity: 1,
    orderId: 3
  }
]

const recipies = [
  {
    name: 'Onion and mushrooms omelette',
    description:
      'Crack the eggs into a bowl and add a pinch of salt. Whisk until well beaten, then set aside. Sauté the onion until soft and translucent, about 3 to 5 minutes. Add the mushrooms and sauté until they release their juices and become soft, about 3 minutes more. Transfer the onions and mushrooms to bowl and set aside.Pour in the beaten eggs. When the edges begin to set, run a silicone or rubber spatula around the circumference, pushing the edge aside slightly, and tilting the pan to let any uncooked egg run under the omelet. When the surface of the egg is almost entirely set, top one side of the omelet with the reserved sautéed mushrooms and onions. Sprinkle evenly with cheese, if using. Use a spatula to carefully fold the other side of the omelet over the filling. Gently flip the stuffed omelet and cook for another minute, until the cheese melts and the egg is set. Transfer to a plate and garnish with freshly snipped chives, if desired. Serve immediately.'
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
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(pr => Product.create(pr))).then(() =>
      Promise.all(orders.map(order => Order.create(order))).then(() =>
        Promise.all(productOrder.map(po => ProductOrder.create(po))).then(() =>
          Promise.all(recipies.map(recipe => Recipe.create(recipe))).then(() =>
            Promise.all(recipeProduct.map(rp => RecipeProduct.create(rp)))
          )
        )
      )
    )
  )

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
