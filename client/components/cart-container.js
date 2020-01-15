import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  removeFromCart,
  getCartAmount,
  getCartTotal,
  addToCart,
  emptyCart,
  getItems
} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems()
    this.props.getAmount()
    this.props.getTotal()
    console.log(this.props)
  }

  render() {
    if (this.props.items.length === 0) {
      return <h1>Nothing in Cart</h1>
    } else {
      let filteredProducts = []
      this.props.items.forEach(product => {
        if (filteredProducts.indexOf(product) < 0)
          filteredProducts.push(product)
      })

      const amount = this.props.amount
      const total = this.props.total

      return (
        <div>
          <h1>Your Cart: </h1>
          <ol>
            {filteredProducts.map(product => {
              return (
                <li className="product row" key={product.id}>
                  <div className="card">
                    <div className="card_image">
                      <img src={product.imgSrc} height="100px" width="100px" />
                    </div>
                    <div className="card_content">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                      <h3>
                        Quantity:{' '}
                        {
                          this.props.items.filter(
                            item => item.id === product.id
                          ).length
                        }
                      </h3>
                      <button
                        onClick={() => {
                          this.props.add(product)
                          this.props.getAmount()
                          this.props.getTotal()
                        }}
                        type="submit"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => {
                          this.props.remove(product)
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
      )
    }
  }
}

const mapStateToProps = function(state) {
  return {
    items: state.cart.items,
    amount: state.cart.amount,
    total: state.cart.total
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    getCartItems: function() {
      const thunk = getItems()
      dispatch(thunk)
    },
    remove: function(product) {
      const thunk = removeFromCart(product)
      dispatch(thunk)
    },
    add: function(product) {
      const thunk = addToCart(product)
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
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)
export default CartContainer
