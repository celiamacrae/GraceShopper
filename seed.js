const db = require('./server/db')
const {User, Product} = require('./server/db/models')

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
  }
]
const seed = () =>
  Promise.all(users.map(user => User.create(user))).then(() =>
    Promise.all(products.map(pr => Product.create(pr)))
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
