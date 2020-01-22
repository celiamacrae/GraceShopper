import React from 'react'
import {Link} from 'react-router-dom'

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        <img
          src="https://media.blueapron.com/home_page/WhatsInTheDelivery/20171213_HomepageUpdate_WhatsInside_1200_Desktop.jpg?quality=75"
          alt="Snow"
        />
        <div className="centered">
          <div align="center">
            <Link to="products" className="homeBtn">
              Check us out
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
