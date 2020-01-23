/* global describe beforeEach it */

const {expect} = require('chai')

const db = require('../db')
const app = require('../index')
const {Product, User} = require('../db/models')
const agent = require('supertest')(app)
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Product Routes', () => {
    const products = [
      {
        id: 1,
        name: 'Tomato',
        price: 1.89,
        weight: '0.5oz',
        imgSrc:
          'https://www.myemarket.in/image/cache/data/Vegetables/10000200_16-fresho-tomato-hybrid-600x600.jpg',
        category: 'Vegetable',
        stockQuantity: 150
      },
      {
        id: 2,
        name: 'Mushroom',
        price: 2.99,
        weight: '0.5oz',
        imgSrc:
          'https://www.myemarket.in/image/cache/data/Vegetables/MUSHRUMS-600x600.jpg',
        category: 'Vegetable',
        stockQuantity: 200
      }
    ]

    beforeEach(() => {
      return Promise.all(products.map(pr => Product.create(pr)))
    })

    it('GET /api/products', async () => {
      const res = await agent.get('/api/products/').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body).to.have.length(2)
      expect(res.body[0].name).to.be.equal('Tomato')
    })
    it('GET /api/products/:id', async () => {
      const res = await agent.get('/api/products/2').expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Mushroom')
    })
    it('PUT /api/delete/:id', async () => {
      await agent.delete('/api/products/2').expect(200)
      const allProducts = await agent.get('/api/products')
      expect(allProducts.body).to.have.length(1)
    })
  })
})

describe('User Routes', () => {
  const users = [
    {
      id: 1,
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
      id: 2,
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

  beforeEach(() => {
    return Promise.all(users.map(pr => User.create(pr)))
  })

  it('GET /api/users', async () => {
    const res = await agent.get('/api/users/').expect(200)

    expect(res.body).to.be.an('array')
    expect(res.body).to.have.length(2)
    expect(res.body[0].firstName).to.be.equal('Liana')
  })
  // it('GET /api/products/:id', async () => {
  //   const res = await agent.get('/api/products/2').expect(200)

  //   expect(res.body).to.be.an('object')
  //   expect(res.body.name).to.be.equal('Mushroom')
  // })
  // it('PUT /api/delete/:id', async () => {
  //   await agent.delete('/api/products/2').expect(200)
  //   const  allProducts=await agent.get('/api/products');
  //   expect(allProducts.body).to.have.length(1);
  // })
})
