import React from 'react'
import {fulfillCart} from '../store/cart'
import {connect} from 'react-redux'
import CreditCardCheckout from './credit-card-payment'
import {subtractFromProductStock} from '../store/products'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      checkProps: {},
      isSubmit: false
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }

  componentDidMount() {
    if (this.props.user.address === null) {
      this.props.user.address = ''
    }
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      address: this.props.user.address
    })
  }

  changeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHandle(event) {
    event.preventDefault()
    let id = this.props.user.id

    this.props.items.forEach(item => {
      let newitem = {
        id: item.id,
        name: item.name,
        price: item.price,
        weight: item.weight,
        imgSrc: item.imgSrc,
        category: item.category,
        description: item.description,
        stockQuantity: item.stockQuantity - item.ProductOrder.quantity
      }
      subtractFromProductStock(newitem)
    })

    if (id === undefined) {
      id = 1
    }
    let stateInfo =
      this.state.email +
      '*' +
      this.state.firstName +
      '*' +
      this.state.lastName +
      '*' +
      this.state.address

    this.setState({
      checkProps: {
        id: id,
        info: stateInfo,
        items: this.props.items,
        total: this.props.total
      },
      isSubmit: true
    })
  }

  render() {
    const isEnabled =
      this.state.address &&
      this.state.firstName &&
      this.state.email &&
      this.state.lastName

    return (
      <div id="main">
        <div className="modal-login modal-update">
          <form onSubmit={this.submitHandle}>
            <div className="modal-header">
              <h4 className="modal-title">
                Fill in all information to continue{' '}
              </h4>
            </div>
            <div>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandle}
                placeholder="First Name"
                required
              />
            </div>

            <div>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandle}
                placeholder="Last Name"
                required
              />
            </div>

            <div>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.changeHandle}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.changeHandle}
                placeholder="Address"
                required
              />
            </div>

            <div>
              <div>
                {!this.state.isSubmit ? (
                  <button disabled={!isEnabled} type="submit" className="btn1">
                    Fill Checkout
                  </button>
                ) : (
                  <div>
                    <h1>Thank You. Please Pay.</h1>
                    <CreditCardCheckout
                      checkout={this.props.checkout}
                      checkProps={this.state.checkProps}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    total: state.cart.total,
    items: state.cart.items
  }
}

const mapDispatchToProps = dispatch => ({
  checkout: (id, info, items) => dispatch(fulfillCart(id, info, items))
})
export default connect(mapState, mapDispatchToProps)(CheckoutForm)
