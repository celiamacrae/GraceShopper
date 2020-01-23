// mocha server/db/models/product-orders.spec.js

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')
const ProductOrder = db.model('ProductOrder')

describe('Product-Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
    describe('correct creation', () => {
      let cody
      let order1

      beforeEach(async () => {
        cody = await User.create({
          id: 1,
          firstName: 'Cody',
          lastName: 'ThePug',
          password: '123',
          status: 'user',
          address: '123 Main St',
          email: 'cody@gmail.com'
        })

        order1 = await Order.create({
          email: 'cody@gmail.com',
          orderinfo: 'a string containing some relevant order info',
          userId: 111
        })
      })

      // it('expects productId to be 1 ', () => {
      //   expect(po1.quantity).to.be.equal(1)
      // })

    })
})
