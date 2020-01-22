import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadSingleProduct, updateSingleProduct} from '../store/products'

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
    <div id="secondP">
      <div className="profile_option">
        <form onSubmit={submitHandle}>
          <div>
            <label htmlFor="name">
              <small> Name</small>
            </label>
            <input
              name="name"
              type="text"
              value={name}
              onChange={changeHandle}
            />
          </div>

          <div>
            <label htmlFor="price">
              <small>Price</small>
            </label>
            <input
              name="price"
              type="text"
              value={price}
              onChange={changeHandle}
            />
          </div>

          <div>
            <label htmlFor="category">
              <small>Category</small>
            </label>
            <input
              name="category"
              type="text"
              value={category}
              onChange={changeHandle}
            />
          </div>

          <div>
            <label htmlFor="weight">
              <small>Weight</small>
            </label>
            <input
              name="weight"
              type="text"
              value={weight}
              onChange={changeHandle}
            />
          </div>

          <div>
            <label htmlFor="stockQuantity">
              <small>Stock Quantity</small>
            </label>
            <input
              name="stockQuantity"
              type="text"
              value={stockQuantity}
              onChange={changeHandle}
            />
          </div>

          <div>
            <label htmlFor="description">
              <small>Description</small>
            </label>
            <input
              name="description"
              type="text"
              value={description}
              onChange={changeHandle}
            />
          </div>

          <div>
            <label htmlFor="imgSrc">
              <small>Image URL:</small>
            </label>
            <input
              name="imgSrc"
              type="text"
              value={imgSrc}
              onChange={changeHandle}
            />
          </div>

          <div>
            <button type="submit" className="button3">
              Update
            </button>
          </div>
        </form>
      </div>
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
        {status === 'admin' ? (
          <UpdateProductForm
            product={this.state}
            changeHandle={this.changeHandle}
            submitHandle={this.submitHandle}
          />
        ) : null}
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
  update: (id, product) => dispatch(updateSingleProduct(id, product))
})
export default connect(mapStateToProps, mapDispatchToProp)(SingleProduct)
