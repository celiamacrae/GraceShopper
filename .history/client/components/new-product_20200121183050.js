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
      <div className="modal-login modal-box">
        <form onSubmit={this.submitHandle}>
          <div className="modal-header">
            <h4 className="modal-title">Create a new product</h4>
          </div>
          <div className="modal-body">
            <div>
              <input
                name="name"
                type="text"
                onChange={this.changeHandle}
                placeholder="Product name"
                required
              />
            </div>

            <div>
              <input
                name="price"
                type="text"
                onChange={this.changeHandle}
                placeholder="Price"
                required
              />
            </div>

            <div>
              <input
                name="category"
                type="text"
                value={this.state.category}
                onChange={this.changeHandle}
                placeholder="Category"
                required
              />
            </div>

            <div>
              <input
                name="weight"
                type="text"
                onChange={this.changeHandle}
                placeholder="Weight"
                required
              />
            </div>

            <div>
              <input
                name="stockQuantity"
                type="text"
                onChange={this.changeHandle}
                placeholder="Available Stock"
                required
              />
            </div>

            <div>
              <input
                name="description"
                type="text"
                onChange={this.changeHandle}
                placeholder="Description"
                required
              />
            </div>

            <div>
              <input
                name="imgSrc"
                type="text"
                onChange={this.changeHandle}
                placeholder="Image Source"
                required
              />
            </div>

            <div>
              <button type="submit" className="btn">
                Add product
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProp = dispatch => ({
  add: product => dispatch(addProduct(product))
})
export default connect(null, mapDispatchToProp)(CreateProduct)
