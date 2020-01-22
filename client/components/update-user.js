/* eslint-disable react/button-has-type */
import React from 'react'
import {updateUser, deleteUser} from '../store/user'
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
      <div className="modal-login modal-update">
        <form onSubmit={this.submitHandle}>
          <div className="modal-header">
            <h4 className="modal-title">Update your profile</h4>
          </div>
          <div className="modal-body">
            <div>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.changeHandle}
              />
            </div>
            <div>
              <input
                name="address"
                type="text"
                value={this.state.address}
                onChange={this.changeHandle}
              />
            </div>

            <div>
              <input
                name="imageURL"
                type="text"
                value={this.state.imageURL}
                onChange={this.changeHandle}
              />
            </div>
            <div>
              <button type="submit" className="btn">
                Update
              </button>
              {this.props.user.status === 'admin' ? (
                ''
              ) : (
                <button
                  className="btn"
                  onClick={() => this.props.deleteUser(this.props.user.id)}
                >
                  Delete Acoount
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: (user, id) => dispatch(updateUser(user, id)),
  deleteUser: userId => dispatch(deleteUser(userId))
})
export default connect(null, mapDispatchToProps)(UpdateUser)
