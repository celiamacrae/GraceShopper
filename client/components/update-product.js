import React from 'react'
import {connect} from 'react-redux'
import {updateSingleProduct} from '../store/products'
class UpdateProduct extends React.Component {
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
  componentDidMount() {
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
    this.props.update(id, this.state)
  }
  render() {
    return (
      <div id="secondP">
        <div className="profile_option">
          <form onSubmit={this.submitHandle}>
            <div>
              <label htmlFor="name">
                <small> Name</small>
              </label>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="price">
                <small>Price</small>
              </label>
              <input
                name="price"
                type="text"
                value={this.state.price}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="category">
                <small>Category</small>
              </label>
              <input
                name="category"
                type="text"
                value={this.state.category}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="weight">
                <small>Weight</small>
              </label>
              <input
                name="weight"
                type="text"
                value={this.state.weight}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="stockQuantity">
                <small>Stock Quantity</small>
              </label>
              <input
                name="stockQuantity"
                type="text"
                value={this.state.stockQuantity}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="description">
                <small>Description</small>
              </label>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="imgSrc">
                <small>Image URL:</small>
              </label>
              <input
                name="imgSrc"
                type="text"
                value={this.state.imgSrc}
                onChange={this.changeHandle}
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
}

const mapDispatchToProp = dispatch => ({
  update: (id, product) => dispatch(updateSingleProduct(id, product))
})
export default connect(null, mapDispatchToProp)(UpdateProduct)
