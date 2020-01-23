/* eslint-disable react/button-has-type */
import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, createUser} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="modal-login modal-box">
      <form onSubmit={handleSubmit} name={name}>
        <div className="modal-header">
          <h4 className="modal-title">Member Login</h4>
        </div>
        <div className="modal-body">
          <div>
            <input name="email" type="text" placeholder="Email" required />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <button type="submit" className="btn">
              {displayName}
            </button>
            <a href="/auth/google" className="btn">
              {' '}
              Login with Google+
            </a>
          </div>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}
const SignupForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <div className="modal-login modal-box modal-signUp">
      <form onSubmit={handleSubmit} name={name}>
        <div className="modal-header">
          <h4 className="modal-title">Become a member</h4>
        </div>
        <div className="modal-body">
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              required
            />
          </div>

          <div>
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>

          <div>
            <input name="email" type="text" placeholder="Email" required />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div>
            <input name="address" type="text" placeholder="Address" required />
          </div>

          <div>
            <input name="imageURL" type="text" placeholder="https://..." />
          </div>
          <div>
            <button type="submit" className="btn">
              Signup
            </button>
            <a href="/auth/google" className="btn">
              Sign Up in with Google+
            </a>
          </div>
        </div>

        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}
/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapDispatchSignUp = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const imageURL = evt.target.imageURL.value
      const address = evt.target.address.value
      const password = evt.target.password.value
      const user = {firstName, lastName, address, imageURL, email, password}
      dispatch(createUser(user, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchSignUp)(SignupForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
