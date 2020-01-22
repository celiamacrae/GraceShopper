import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Signup,
  AllProductsContainer,
  AllRecipiesContainer,
  UserHome,
  Login
} from './components'
import SingleProduct from './components/single-product-view'
import SingleRecipeContainer from './components/single-recipe-view'
import CartContainer from './components/cart-container'
import {me} from './store'
import CheckoutForm from './components/checkout-form'
import CreateProduct from './components/new-product'
import CreditCardCheckout from './components/credit-card-payment'
// import SingleOrderHistory from './components/single-order-history'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, user} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/products" component={AllProductsContainer} />
        <Route path="/recipies/:recipeId" component={SingleRecipeContainer} />
        <Route path="/recipies" component={AllRecipiesContainer} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={CartContainer} />
        <Route path="/checkout" component={CheckoutForm} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/products" component={AllProductsContainer} />

            <Route
              path="/recipies/:recipeId"
              component={SingleRecipeContainer}
            />
            <Route path="/recipies" component={AllRecipiesContainer} />
            <Route path="/user" component={UserHome} />
            {user.status !== 'admin' ? (
              <div>
                <Route path="/cart" component={CartContainer} />
                <Route path="/checkout" component={CheckoutForm} />
                <Route path="/payment" component={CreditCardCheckout} />
              </div>
            ) : (
              <Route path="/add" component={CreateProduct} />
            )}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route path="/" component={AllProductsContainer} />
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
