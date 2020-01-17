const configureStripe = require('stripe')
const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'production'
    ? 'sk_test_BgR1y1b2rZ18Y0jokSzFTLUD00MFuzPRdZ'
    : 'sk_test_BgR1y1b2rZ18Y0jokSzFTLUD00MFuzPRdZ'
const stripe = configureStripe(STRIPE_SECRET_KEY)
module.exports = stripe
