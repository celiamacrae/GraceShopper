import {connect} from 'react-redux'
import {loadAllProducts, deletedProduct} from '../store/products'
import {addToCart, gotSavedCart} from '../store/cart'
import allProducts from './all-products'

const mapStateToProps = function(state) {
  return {
    products: state.products,
    userId: state.user.id,
    userStatus: state.user.status
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onLoadAllProducts: function() {
      const thunk = loadAllProducts()
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
