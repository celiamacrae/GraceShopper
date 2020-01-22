import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  removeFromCart,
  getCartAmount,
  getCartTotal,
  addToCart,
  emptyCart,
  loadCart,
  gotSavedCart
} from '../store/cart'
import {me} from '../store/user'
import {guestSession} from './all-products'

const removeGuestItem = product => {
  let cart = JSON.parse(sessionStorage.getItem('guest'))
  cart = cart.filter(el => {
    if (el.id === product.id) {
      if (el.ProductOrder.quantity === 1) return false
      else {
        el.ProductOrder.quantity--
      }
    }
    return true
  })
  window.sessionStorage.setItem('guest', JSON.stringify(cart))
  return cart
}

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    if (this.props.userId !== undefined) {
      await this.props.getCartItems(this.props.userId)
      const guestCart = JSON.parse(sessionStorage.getItem('guest'))
      if (guestCart !== null) {
        guestCart.forEach(async product => {
          await this.props.add(product, this.props.userId)
        })
      }
      sessionStorage.clear()
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guest'))
      if (guestCart !== null) await this.props.addGuestCart(guestCart)
    }
    await this.props.getAmount()
    this.props.getTotal()
  }

  render() {
    const amount = this.props.amount
    const total = this.props.total
    return (
      <div id="main">
        <div id="cart">
          {this.props.items === null ? <h1>Nothing in Cart</h1> : null}
          {this.props.items.length === 0 ? <h1>Nothing in Cart</h1> : null}
          <ol>
            {this.props.items.map(product => {
              return (
                <li key={product.id}>
                  <div className="card">
                    <div className="card_image">
                      <img src={product.imgSrc} height="100px" width="100px" />
                    </div>
                    <div className="card_content">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <h3>Quantity: {product.ProductOrder.quantity}</h3>
                      <button
                        onClick={() => {
                          if (this.props.userId)
                            this.props.add(product, this.props.userId)
                          else {
                            guestSession(this.props.addGuestCart, product)
                          }
                          this.props.getAmount()
                          this.props.getTotal()
                        }}
                        type="submit"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          if (this.props.userId) {
                            this.props.remove(product, this.props.userId)
                          } else {
                            let cart = removeGuestItem(product)
                            this.props.addGuestCart(cart)
                          }
                          this.props.getAmount()
                          this.props.getTotal()
                        }}
                        type="submit"
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
          <h2>Amount of Products: {amount}</h2>
          <h2>Total: {total.toFixed(2)} USD </h2>

          <div className="card">
            {' '}
            <Link to="/checkout" className="button">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    items: state.cart.items,
    amount: state.cart.amount,
    total: state.cart.total,
    userId: state.user.id
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getCartItems: function(id) {
      const thunk = loadCart(id)
      dispatch(thunk)
    },
    remove: function(product, userId) {
      const thunk = removeFromCart(product, userId)
      dispatch(thunk)
    },
    add: function(product, userId) {
      const thunk = addToCart(product, userId)
      dispatch(thunk)
    },
    empty: function() {
      const thunk = emptyCart()
      dispatch(thunk)
    },
    getAmount: function() {
      const thunk = getCartAmount()
      dispatch(thunk)
    },
    getTotal: function() {
      const thunk = getCartTotal()
      dispatch(thunk)
    },
    addGuestCart: items => dispatch(gotSavedCart(items)),
    getUser: () => dispatch(me())
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
