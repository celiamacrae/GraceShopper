import {connect} from 'react-redux'
import {loadAllProducts, deletedProduct} from '../store/products'
import {addToCart, gotSavedCart, getSavedCart, loadCart} from '../store/cart'
import allProducts from './all-products'

const mapStateToProps = function(state) {
  return {
    products: state.products,
    userId: state.user.id,
    userStatus: state.user.status,
    cart: state.cart
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onLoadAllProducts: function() {
      const thunk = loadAllProducts()
      dispatch(thunk)
    },
    getCartItems: function(id) {
      const thunk = loadCart(id)
      dispatch(thunk)
    },
    add: function(product, userId, quantity) {
      const thunk = addToCart(product, userId, quantity)
      dispatch(thunk)
    },
    delete: id => dispatch(deletedProduct(id)),
    addGuestCart: items => dispatch(gotSavedCart(items))
  }
}

const allProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  allProducts
)
export default allProductsContainer
