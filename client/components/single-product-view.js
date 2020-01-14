import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadSingleProduct} from '../store/products'

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.loadSingleProduct(id)
  }
  render() {
    const product = this.props.product
    if (product === undefined) return <h1>Loading...</h1>
    return (
      <div id="mainBody">
        <div className="cards">
          <li className="card-item" key={product.id}>
            <div className="card">
              <div className="card_image">
                <img src={product.imgSrc} height="400px" width="400px" />
              </div>
              <div className="card_content">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <h4> ${product.price}</h4>
                <button type="submit"> Add </button>
              </div>
            </div>
          </li>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.products[0]
})
const mapDispatchToProp = dispatch => ({
  loadSingleProduct: id => dispatch(loadSingleProduct(id))
})
export default connect(mapStateToProps, mapDispatchToProp)(SingleProduct)
