import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import STRIPE_PUBLISHABLE from './constants/stripe'
import PAYMENT_SERVER_URL from './constants/server'
import history from '../history'

const CURRENCY = 'USD'
const successPayment = props => {
  alert('Payment Successful')
  props.checkout(
    props.checkProps.id,
    props.checkProps.info,
    props.checkProps.items
  )
  history.push('/products')
}
const errorPayment = data => {
  alert('Payment Error')
}
const onToken = checkProps => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description: checkProps.info,
      source: token.id,
      currency: CURRENCY,
      amount: checkProps.total
    })
    .then(successPayment)
    .catch(errorPayment)

const CreditCardCheckout = props => {
  console.log('props are here', props)
  return (
    <StripeCheckout
      name="test"
      checkProps={props.checkProps}
      token={onToken}
      currency={CURRENCY}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  )
}
export default CreditCardCheckout
