import React from 'react'

import {connect} from 'react-redux'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      imageURL: '',
      email: '',
      password: ''
    }
    this.submitHandle = this.submitHandle.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
  }
  componentDidMount() {
    //   const data=this.props.campus
    // this.setState({
    //   firstName:data.firstName,
    //   lastName:data.lastName,
    //     address:data.address,
    //     email:data.email,
    //     imageURL:data.imageURL,
    //     password:data.password
    // })
  }

  changeHandle(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  submitHandle(event) {
    event.preventDefault()
  }
  render() {
    return (
      <div>
        <div className="profile_option">
          <form onSubmit={this.submitHandle}>
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
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({})
export default connect(null, mapDispatchToProps)(UpdateUser)
