import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/products'
class CreateProduct extends React.Component {
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

  changeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHandle(event) {
    event.preventDefault()
    this.props.add(this.state)
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
              <input name="name" type="text" onChange={this.changeHandle} />
            </div>

            <div>
              <label htmlFor="price">
                <small>Price</small>
              </label>
              <input name="price" type="text" onChange={this.changeHandle} />
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
              <input name="weight" type="text" onChange={this.changeHandle} />
            </div>

            <div>
              <label htmlFor="stockQuantity">
                <small>Stock Quantity</small>
              </label>
              <input
                name="stockQuantity"
                type="text"
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
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="imgSrc">
                <small>Image URL:</small>
              </label>
              <input name="imgSrc" type="text" onChange={this.changeHandle} />
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
  add: product => dispatch(addProduct(product))
})
export default connect(null, mapDispatchToProp)(CreateProduct)
