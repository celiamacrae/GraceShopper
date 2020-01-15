const Sequelize = require('sequelize')
const db = require('./server/db')
const {User, Product, Order, ActiveCart} = require('./server/db/models')
const {CartProduct} = require('./server/db/models')
const ProductOrder = db.define('ProductOrder', {
  productId: Sequelize.INTEGER,
  orderId: Sequelize.INTEGER
})
// const CartProduct = db.define('CartProduct', {
//   activeCartId: Sequelize.INTEGER,
//   productId: Sequelize.INTEGER
// })

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
    name: 'Mango',
    price: 2.59,
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/Mango-600x600.jpg',
    category: 'fruit'
  },
  {
    name: 'Tomato',
    price: 1.89,
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/10000200_16-fresho-tomato-hybrid-600x600.jpg',
    category: 'vegetable'
  },
  {
    name: 'Mushroom',
    price: 2.99,
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
    category: 'vegetable'
  },
  {
    name: 'Chicken',
    price: 7.59,
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/chicken-600x600.jpg',
    category: 'meat'
  },
  {
    name: 'Eggs',
    price: 3.29,
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/eggs%20new-600x600.jpg',
    category: 'dairy'
  },
  {
    name: 'Onions',
    price: 1.29,
    imgSrc:
      'https://www.myemarket.in/image/cache/data/Vegetables/fresh-onion-red-v-1-kg-1-600x600.png',
    category: 'Vegetable'
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
    // productId: 3,
    userId: 2
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
    // productId: 4,

    userId: 2
  }
]
const productOrder = [
  {
    productId: 1,
    orderId: 2
  },
  {
    productId: 2,
    orderId: 2
  },
  {
    productId: 3,
    orderId: 1
  }
]

const cartProduct = [
  {
    activeCartId: 1,
    productId: 1
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(pr => Product.create(pr))).then(() =>
      Promise.all(orders.map(order => Order.create(order))).then(
        () =>
          Promise.all(productOrder.map(po => ProductOrder.create(po)))
            // .then(()=>
            //   Promise.all(ActiveCart.create({userId:1}))
            .then(() =>
              Promise.all(cartProduct.map(cp => CartProduct.create(cp)))
            )
        // )
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
