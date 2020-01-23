import React from 'react'
import {Link} from 'react-router-dom'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <img
          src="https://images.pexels.com/photos/129465/pexels-photo-129465.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
        />
        <div className="centered">
          <div align="center">
            <h2>MUSHROOM MARKET</h2>
            <h3>We Sell More Than Mushrooms</h3>
            <Link to="products" className="homeBtn">
              Check us out
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
