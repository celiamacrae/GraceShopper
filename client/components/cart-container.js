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
          this.props.add(product, this.props.userId)
          this.props.getAmount()
          this.props.getTotal()
        })
      }
      sessionStorage.clear()
    } else {
      const guestCart = JSON.parse(sessionStorage.getItem('guest'))
      if (guestCart !== null) await this.props.addGuestCart(guestCart)
    }
  }

  render() {
    this.props.getAmount()
    this.props.getTotal()
    const amount = this.props.amount
    const total = this.props.total
    return (
      <div id="main">
        <div className="cartContainer">
          <div className="table">
            <div className="layout-inline row th">
              <div className="col col-pro">Product</div>
              <div className="col col-price align-center " />
              <div className="col col-qty align-center " />
              <div className="col">Price</div>
              <div className="col">QTY</div>
            </div>
            {this.props.items.map(product => {
              return (
                <div className="layout-inline row" key={product.id}>
                  <div className="col col-pro layout-inline">
                    <img src={product.imgSrc} className="cartImg" />
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </div>

                  <div className="col col-price col-numeric align-center " />
                  <div className="col col-qty layout-inline" />
                  <div className="col col-vat col-numeric">
                    <p>{product.price}</p>
                  </div>

                  <div className="col col-total col-numeric">
                    <div className="qtybtn">
                      <button
                        className="qty qty-minus"
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
                        {' '}
                        -{' '}
                      </button>{' '}
                      <p>{product.ProductOrder.quantity} </p>{' '}
                      <button
                        className="qty qty-plus"
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
                        {' '}
                        +{' '}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            <div className="tf">
              <div className="row layout-inline">
                <div className="col">
                  <p>Total Price: </p>
                </div>
                <div className="col">
                  <p>{total.toFixed(2)}</p>
                </div>
              </div>

              <div className="row layout-inline">
                <div className="col">
                  <p>Amount in Cart: </p>
                </div>
                <div className="col">
                  <p>{amount}</p>
                </div>
              </div>
            </div>
          </div>{' '}
          <Link to="/checkout" className="btn1">
            Proceed to checkout
          </Link>
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
