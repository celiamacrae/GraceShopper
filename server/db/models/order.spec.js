// mocha server/db/models/order.spec.js

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('User model', () => {
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

      it('expects email to be a string ', () => {
        expect(typeof order1.email).to.be.equal('string')
      })

      it('expects email to be equal to cody@gmail.com', () => {
        expect(order1.email).to.be.equal('cody@gmail.com')
      })

      it('expects status to default to pending ', () => {
        expect(order1.status).to.be.equal('pending')
      })

      it('expects the order to belong to user1 ', () => {
        expect(order1.userId).to.be.equal(1)
      })

      it('expects order info to be a string ', () => {
        expect(typeof order1.orderInfo).to.be.equal('object')
      })

      it('expects email to be order info to be null', () => {
        expect(order1.orderInfo).to.be.equal(null)
      })

    }) // end describe('correctPassword')
}) // end describe('User model')
