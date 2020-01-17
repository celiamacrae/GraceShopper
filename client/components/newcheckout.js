import React from 'react'
import {checkout} from '../store/cart'
//need to write checkout thunk
import {connect} from 'react-redux'

class NewCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: ''
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }

  componentDidMount() {
    const {firstName, lastName, address} = this.props.user
    this.setState({
      firstName: firstName,
      lastName: lastName,
      address: address
    })
  }

  changeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHandle(event) {
    event.preventDefault()
    const id = this.props.user.id
    console.log(this.state)
    this.props.checkout(this.state, id, 'fulfilled')
  }

  render() {
    const user = this.props.user
    console.log('HERE', this.props)
    return (
      <div id="secondP">
        <div className="checkout">
          <form onSubmit={this.submitHandle}>
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input
                name="firstName"
                type="text"
                value={user.firstName}
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
                value={user.lastName}
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
                value={user.address}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <button type="submit" className="button3">
                Submit Order
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = function(dispatch) {
  return {
    onCheckout: () => {
      const thunk = checkout()
      dispatch(thunk)
    }
  }
}

const NewCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(
  NewCheckout
)
export default NewCheckoutContainer
