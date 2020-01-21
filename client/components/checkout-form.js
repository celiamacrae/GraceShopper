import React from 'react'
import {fulfillCart} from '../store/cart'
import {connect} from 'react-redux'
import CreditCardCheckout from './credit-card-payment'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: ''
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
      address: this.props.user.address,
      isSubmit: false
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
    console.log(id)
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
    this.props.checkout(id, stateInfo, this.props.items)
    this.setState({isSubmit: true})
  }

  render() {
    const isEnabled =
      this.state.address &&
      this.state.firstName &&
      this.state.email &&
      this.state.lastName

    return (
      <div id="secondP">
        <div className="profile_option">
          <form onSubmit={this.submitHandle}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.changeHandle}
              />
            </div>
            <div>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <input
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <button disabled={!isEnabled} type="submit" className="button3">
                Checkout
              </button>
              <div>{!this.state.isSubmit ? null : <CreditCardCheckout />}</div>
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
    amount: state.cart.amount,
    total: state.cart.total,
    items: state.cart.items
  }
}

const mapDispatchToProps = dispatch => ({
  checkout: (id, info, items) => dispatch(fulfillCart(id, info, items))
})
export default connect(mapState, mapDispatchToProps)(CheckoutForm)
