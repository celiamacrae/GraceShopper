/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
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
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
