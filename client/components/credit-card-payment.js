import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import STRIPE_PUBLISHABLE from './constants/stripe'
import PAYMENT_SERVER_URL from './constants/server'
import history from '../history'

class CreditCardCheckout extends React.Component {
  constructor(props) {
    super(props)

    this.onToken = this.onToken.bind(this)
  }

  onToken = () => {
    try {
      this.props.checkout(
        this.props.checkProps.id,
        this.props.checkProps.info,
        this.props.checkProps.items
      )
      alert('Thank You for Shopping With Us!')
      history.push('/products')
    } catch (err) {
      alert('Payment Error')
    }
  }

  render() {
    return (
      <StripeCheckout
        className="button3"
        name="Mushroom Grocers"
        amount={this.props.checkProps.total * 100}
        token={this.onToken}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    )
  }
}

export default CreditCardCheckout
