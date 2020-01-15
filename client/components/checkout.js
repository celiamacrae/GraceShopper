import React from 'react'
import {emptyCart, getItems} from '../store/cart'
import {connect} from 'react-redux'

class Checkout extends React.Component {
  render() {
    const user = this.props.user
    return (
      <div>
        {user.firstName ? (
          //if user logged in
          <div>
            <h1>My information</h1>
            <h2>First Name: {user.firstName} </h2>
            <h2>Last Name: {user.lastName}</h2>
            <h2>Email: {user.email}</h2>
            <h1>Shipping</h1>
            <h2>Address: {user.address}</h2>
            {/* <h1>Payment method</h1>
      <form>
        <input type="radio" name="payment" value="creditCard" >Credit/Debit card</input><br/>
        <input type="radio" name="payment" value="paypal" >Paypal/venmo/Braintree</input><br/>
      </form> */}
          </div>
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
  user: state.user,
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
