import {connect} from 'react-redux'
import {loadAllProducts, deletedProduct} from '../store/products'
import {addToCart} from '../store/cart'
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
    add: function(product, userId, quatity) {
      const thunk = addToCart(product, userId, quatity)
      dispatch(thunk)
    },
    delete: id => dispatch(deletedProduct(id))
  }
}

const allProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  allProducts
)
export default allProductsContainer
