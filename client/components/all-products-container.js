import {connect} from 'react-redux'
import loadAllProducts from '../store/products'
import allProducts from './all-products'

const mapStateToProps = function(state) {
  return {
    products: state.products
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    onLoadAllProducts: function() {
      const thunk = loadAllProducts()
      dispatch(thunk)
    }
  }
}

const allProductsContainer = connect(mapStateToProps, mapDispatchToProps)(
  allProducts
)
export default allProductsContainer
