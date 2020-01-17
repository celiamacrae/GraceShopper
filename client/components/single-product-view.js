import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadSingleProduct} from '../store/products'
import UpdateProduct from './update-product'
class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.productId
    this.props.loadSingleProduct(id)
  }
  render() {
    const status = this.props.user.status
    const product = this.props.product
    if (product === undefined) return <h1>Loading...</h1>
    return (
      <div id={status === 'admin' ? 'update' : 'mainP'}>
        <div className="cards">
          <li className="card-item" key={product.id}>
            <div className={status === 'admin' ? 'updateView' : 'card'}>
              <div className="card_image">
                <br />
                <img src={product.imgSrc} height="350px" width="350px" />
              </div>
              <div className="card_content">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <h4 className="price"> ${product.price}</h4>

                {status === 'admin' ? (
                  <div>
                    <h4 className="price">
                      {' '}
                      Weight of a product : {product.weight}
                    </h4>
                    <h4 className="price">
                      {' '}
                      We currently have in Stock: {product.stockQuantity}
                    </h4>
                    <h4 className="price">
                      {' '}
                      Category of the product : {product.category}
                    </h4>
                    <br />
                  </div>
                ) : (
                  <div>
                    <button type="submit"> Add </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        </div>
        {status === 'admin' ? <UpdateProduct product={product} /> : null}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.products[0],
  user: state.user
})
const mapDispatchToProp = dispatch => ({
  loadSingleProduct: id => dispatch(loadSingleProduct(id))
})
export default connect(mapStateToProps, mapDispatchToProp)(SingleProduct)
