import React from 'react'
import {emptyCart, getItems} from '../store/cart'
import {connect} from 'react-redux'

class GuestCheckout extends React.Component {
  render() {
    const user = this.props.user
    return (
      <div>
        {this.props.user.firstName ? (
          //if user logged in
          <div />
        ) : (
          //not authorized guest
          <div>
            <h1>Guest</h1>
          </div>
        )}
        <div>Price: {this.props.cart.amount}</div>
        <button
          onClick={() => {
            this.props.empty()
          }}
        >
          Place your order
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
})

const mapDispatchToProps = function(dispatch) {
  return {
    empty: () => {
      const thunk = emptyCart()
      dispatch(thunk)
    }
  }
}

const CheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(Checkout)
export default CheckoutContainer
