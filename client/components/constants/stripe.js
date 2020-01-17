const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_pXhWoPDn6kxLKdCPgQKgUW0S00rwSP47RB'
    : 'pk_test_pXhWoPDn6kxLKdCPgQKgUW0S00rwSP47RB'
export default STRIPE_PUBLISHABLE
