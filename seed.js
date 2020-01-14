const Sequelize = require('sequelize')
const db = require('./server/db')
const {User, Product, Order} = require('./server/db/models')
const ProductOrder = db.define('ProductOrder', {
  productId: Sequelize.INTEGER,
  orderId: Sequelize.INTEGER
})

const users = [
  {
    firstName: 'Liana',
    lastName: 'Chan',
    address: '123 Magnolia Ave.,NY 11206',
    email: 'liana.andreea97@yahoo.com',
    password: '123'
  },
  {
    firstName: 'Oscar',
    lastName: 'Chan',
    address: '123 Magnolia Ave.,NY 11206',
    email: 'oscar_19@yahoo.com',
    password: '123'
  },
  {
    firstName: 'Celia',
    lastName: 'Macrae',
    address: '309 E 52nd St., New York, NY 10022',
    email: 'celiamacrae@gmail.com',
    password: '123'
  }
]
const products = [
  {
    name: 'Banana',
    price: 2.59,
    imgSrc:
      'http://www.pngplay.com/wp-content/uploads/2/Banana-Transparent-File.png',
    category: 'fruit'
  },
  {
    name: 'Tomato',
    price: 1.89,
    imgSrc: 'https://www.shrestaindiangrocery.com/product/tomato-1lb-2/',
    category: 'vegetable'
  },
  {
    name: 'Mushroom',
    price: 2.99,
    imgSrc: 'https://www.shrestaindiangrocery.com/product/tomato-1lb-2/',
    category: 'vegetable'
  },
  {
    name: 'Beef',
    price: 8.59,
    imgSrc: 'https://www.shrestaindiangrocery.com/product/tomato-1lb-2/',
    category: 'meat'
  },
  {
    name: 'Milk',
    price: 3.99,
    imgSrc: 'https://www.shrestaindiangrocery.com/product/tomato-1lb-2/',
    category: 'dairy'
  }
]
const orders = [
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    firstName: 'Celia',
    lastName: 'Macrae',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celiamacrae@gmail.com',
    productId: 3
  },
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    firstName: 'Cel',
    lastName: 'Macr',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celia.macrae@gmail.com'
  },
  {
    date: '2015-02-09 18:05:28.989 +00:00',
    firstName: 'Cel',
    lastName: 'Macr',
    address: '309 E 52nd St',
    paymentInformation: '1234 5678 9012 3456',
    email: 'celia.macrae@gmail.com',
    productId: 4
  }
]
const productOrder = [
  {
    productId: 1,
    orderId: 1
  },
  {
    productId: 2,
    orderId: 1
  },
  {
    productId: 3,
    orderId: 1
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(pr => Product.create(pr))).then(
      () =>
        Promise.all(orders.map(order => Order.create(order)))
        .then(() =>
          Promise.all(productOrder.map(po => ProductOrder.create(po)))
        )

      // .then(() =>
      // Promise.all(orders.map(o => ProductOrder.create(o))))
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
