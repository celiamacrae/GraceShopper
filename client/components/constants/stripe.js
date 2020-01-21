require('../../../secrets')

const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_PUBLISHABLE_KEY
    : process.env.STRIPE_PUBLISHABLE_KEY
export default STRIPE_PUBLISHABLE
