import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import UpdateUser from './update-user'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, firstName, lastName, address, imageURL, id} = props
  const user_profile = {email, firstName, lastName, address, imageURL, id}
  console.log(props)
  return (
    <div className="profiles">
      <div className="cards">
        <div>
          <div className="profile ">
            <img src={imageURL} height="300px" width="300px" />
            <h3 className="price">Welcome, {firstName + ' ' + lastName}!</h3>
          </div>

          <ul className="menu">
            <li className="menu_item">
              <Link to="/user" className="button1">
                Profile
              </Link>
            </li>
            <li className="menu_item">
              <Link to="/products">Order history</Link>
            </li>
            <li className="menu_item">
              <Link to="/user/settings">Update Profile</Link>
            </li>
          </ul>
        </div>
        <div className="profile_option">
          {props.location.pathname === '/user' ? (
            <div>
              <div className="card_content">
                <h3>First Name: </h3>
                <p>{firstName}</p>
                <h3>Last Name: </h3>
                <p>{lastName}</p>
                <h3>Address: </h3>
                <p>{address}</p>
                <h3>Email: </h3>
                <p>{email}</p>
              </div>
            </div>
          ) : (
            <div>
              <Route
                path={`${props.match.path}/settings`}
                render={() => <UpdateUser user={user_profile} />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    address: state.user.address,
    imageURL: state.user.imageURL,
    id: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
