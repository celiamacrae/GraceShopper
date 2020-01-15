import React from 'react'
import {updateUser} from '../store/user'
import {connect} from 'react-redux'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      imageURL: '',
      email: ''
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }
  componentDidMount() {
    const {email, firstName, lastName, address, imageURL} = this.props.user
    this.setState({
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      imageURL: imageURL
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
    this.props.updateUser(this.state, id)
  }
  render() {
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
              <label htmlFor="imageURL">
                <small>Image URL:</small>
              </label>
              <input
                name="imageURL"
                type="text"
                value={this.state.imageURL}
                onChange={this.changeHandle}
              />
            </div>
            <div>
              <button type="submit" className="button3">
                Update
              </button>
            </div>
          </form>

          {/* <div>
            <p className='price'> Not satisfied with our services?</p>
            <button className="button3">Delete Acoount</button>
          </div> */}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (user, id) => dispatch(updateUser(user, id))
})
export default connect(null, mapDispatchToProps)(UpdateUser)
