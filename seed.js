const Sequelize = require('sequelize')
const db = require('./server/db')
const {User, Product, Order, ProductOrder} = require('./server/db/models')

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
    firstName: 'Oscar',
    lastName: 'Chan',
    status: 'user',
    address: '123 Magnolia Ave.,NY 11206',
    email: 'oscar_19@yahoo.com',
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
    category: 'fruit'
  },
  {
    name: 'Tomato',
    price: 1.89,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/10000200_16-fresho-tomato-hybrid-600x600.jpg',
    category: 'vegetable'
  },
  {
    name: 'Mushroom',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
    category: 'vegetable'
  },
  {
    name: 'Chicken',
    price: 7.59,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/chicken-600x600.jpg',
    category: 'meat'
  },
  {
    name: 'Eggs',
    price: 3.29,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/eggs%20new-600x600.jpg',
    category: 'dairy'
  },
  {
    name: 'Onions',
    price: 1.29,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-onion-red-v-1-kg-1-600x600.png',
    category: 'Vegetable'
  },
  {
    name: 'Garlic',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Garlic-600x600.jpg',
    category: 'Vegetable'
  },
  {
    name: 'Potato',
    price: 2.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Potato1-600x600.jpg',
    category: 'Vegetable'
  },
  {
    name: 'Beet Root',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-cut-beetroot-600x600.gif',
    category: 'Big_Vegetable'
  },
  {
    name: 'Sweet Corn',
    price: 0.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/sweet%20corn-600x600.jpg',
    category: 'Big_Vegetable'
  },
  {
    name: 'Sweet Potato',
    price: 1.99,
    weight: '0.5oz',
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Beauregard-Sweet-Potato_0-600x600.png',
    category: 'Big_Vegetable'
  }
]
const orders = [
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Celia',
    lastName: 'Macrae',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celiamacrae@gmail.com',
    // productId: 3,
    userId: 2
  },
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Cel',
    lastName: 'Macr',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celia.macrae@gmail.com'
  },
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    status: 'fulfilled',
    firstName: 'Cel',
    lastName: 'Macr',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celia.macrae@gmail.com',
    // productId: 4,
    userId: 2
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
    quantity: 1,
    orderId: 1
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(pr => Product.create(pr))).then(() =>
      Promise.all(orders.map(order => Order.create(order))).then(() =>
        Promise.all(productOrder.map(po => ProductOrder.create(po)))
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
