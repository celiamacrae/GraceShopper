import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadSingleProduct, updateSingleProduct} from '../store/products'
import {addToCart, gotSavedCart} from './../store/cart'
import {guestSession} from './all-products'
const UpdateProductForm = props => {
  const {
    price,
    name,
    description,
    imgSrc,
    weight,
    category,
    stockQuantity
  } = props.product
  const submitHandle = props.submitHandle
  const changeHandle = props.changeHandle
  return (
    <div className="modal-login modal-box modal-signUp">
      <form onSubmit={submitHandle}>
        <div className="modal-header">
          <h4 className="modal-title">Update Product information</h4>
        </div>
        <div className="modal-body">
          <div>
            <input
              name="name"
              type="text"
              value={name}
              onChange={changeHandle}
            />
          </div>

          <div>
            <input
              name="price"
              type="text"
              value={price}
              onChange={changeHandle}
            />
          </div>

          <div>
            <input
              name="category"
              type="text"
              value={category}
              onChange={changeHandle}
            />
          </div>

          <div>
            <input
              name="weight"
              type="text"
              value={weight}
              onChange={changeHandle}
            />
          </div>

          <div>
            <input
              name="stockQuantity"
              type="text"
              value={stockQuantity}
              onChange={changeHandle}
            />
          </div>

          <div>
            <input
              name="description"
              type="text"
              value={description}
              onChange={changeHandle}
              placeholder="Description"
            />
          </div>

          <div>
            <input
              name="imgSrc"
              type="text"
              value={imgSrc}
              onChange={changeHandle}
            />
          </div>

          <div>
            <button type="submit" className="btn">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: '',
      description: '',
      imgSrc: '',
      category: '',
      weight: '',
      stockQuantity: ''
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }
  async componentDidMount() {
    const id = this.props.match.params.productId
    await this.props.loadSingleProduct(id)
    let description = ''
    const {
      category,
      name,
      price,
      imgSrc,
      weight,
      stockQuantity
    } = this.props.product
    if (this.props.description !== undefined) description = this.props.product
    this.setState({
      name: name,
      price: price,
      description: description,
      category: category,
      imgSrc: imgSrc,
      weight: weight,
      stockQuantity: stockQuantity
    })
  }
  changeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHandle(event) {
    event.preventDefault()
    const id = this.props.product.id
    console.log(this.state)
    this.props.update(id, this.state)
  }
  render() {
    const status = this.props.user.status
    const product = this.props.product
    if (product === undefined) return <h1>Loading...</h1>
    return (
      <div id="main">
        <div id={status === 'admin' ? 'update' : 'main'}>
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
                  {product.stockQuantity === 0 ? (
                    <h4>Out of Stock!</h4>
                  ) : (
                    <h4>In Stock: {product.stockQuantity}</h4>
                  )}

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
                      <button
                        onClick={() => {
                          //checks for guest or user
                          if (this.props.userId) {

                            this.props.add(product, this.props.userId)
                          } else {
                            guestSession(this.props.addGuestCart, product)
                          }
                        }}
                        type="submit"
                        disabled={product.stockQuantity < 1}
                      >
                        {' '}
                        Add To Cart
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          </div>
          {status === 'admin' ? (
            <UpdateProductForm
              product={this.state}
              changeHandle={this.changeHandle}
              submitHandle={this.submitHandle}
            />
          ) : null}
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.products[0],
  user: state.user
})
const mapDispatchToProp = dispatch => ({
  loadSingleProduct: id => dispatch(loadSingleProduct(id)),
  update: (id, product) => dispatch(updateSingleProduct(id, product)),
  add: function(product, userId) {
    const thunk = addToCart(product, userId)
    dispatch(thunk)
  },
  addGuestCart: items => dispatch(gotSavedCart(items))
})
export default connect(mapStateToProps, mapDispatchToProp)(SingleProduct)
