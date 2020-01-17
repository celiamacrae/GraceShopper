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
    <div>
      <div className="loginForm">
        <form onSubmit={handleSubmit} name={name}>
          <div className="group">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div className="group">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit" className="button3">
              {displayName}
            </button>
          </div>

          <button className="button3">
            <a href="/auth/google">Login in with Google</a>
          </button>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}
const SignupForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <div>
      <div id="mainP">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>

          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>

          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>

          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>

          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" type="text" />
          </div>

          <div>
            <label htmlFor="imageURL">
              <small>Image URL:</small>
            </label>
            <input name="imageURL" type="text" />
          </div>

          <div>
            <button type="submit" className="button3">
              Sign Up
            </button>
          </div>

          <button className="button3">
            <a href="/auth/google">Login in with Google</a>
          </button>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
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
