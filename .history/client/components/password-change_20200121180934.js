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
      <div>
        <p>To Change password please write the old password</p>
        <form onSubmit={this.submitHandle}>
          <div>
            <label htmlFor="oldPassword">
              <small>Old password:</small>
            </label>
            <input
              name="oldPassword"
              type="password"
              onChange={this.changeHandle}
              value={this.state.oldPassword}
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>New password:</small>
            </label>
            <input
              name="password"
              type="password"
              onChange={this.changeHandle}
              value={this.state.password}
            />
          </div>
          <button className="button3" type="submit">
            Change Password
          </button>
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
