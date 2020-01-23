import React from 'react'
import {updateUser, me} from '../store/user'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class PasswordForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      password: ''
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
    const id = this.props.user.id
    this.props.updateUser(
      {password: this.state.password, oldPassword: this.state.oldPassword},
      id
    )
    this.setState = {
      password: '',
      oldPassword: ''
    }
  }
  render() {
    return (
      <div className="modal-login modal-password">
        <form onSubmit={this.submitHandle}>
          <div className="modal-body">
            <div>
              <input
                name="oldPassword"
                type="password"
                onChange={this.changeHandle}
                value={this.state.oldPassword}
                placeholder="Old password"
                required
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                onChange={this.changeHandle}
                value={this.state.password}
                placeholder="New password"
                required
              />
            </div>
            <button type="submit" className="btn">
              Change password
            </button>
          </div>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  updateUser: (user, id) => dispatch(updateUser(user, id)),
  checkUser: (email, password) => dispatch(me(email, password))
})
export default connect(null, mapDispatchToProps)(PasswordForm)
