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
