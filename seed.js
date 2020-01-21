const Sequelize = require('sequelize')
const db = require('./server/db')
const {User, Product, ProductOrder} = require('./server/db/models')

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

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(
    () => Promise.all(products.map(pr => Product.create(pr)))

    // .then(() =>
    //   // Promise.all(orders.map(order => Order.create(order))).then(() =>
    //     Promise.all(productOrder.map(po => ProductOrder.create(po)))
    //   )
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
