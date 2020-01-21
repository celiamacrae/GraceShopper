import React from 'react'
import {loadUserOrders} from '../store/orders'
import {connect} from 'react-redux'
import {render} from 'enzyme'

export default class SingleOrder extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>This is a order</h1>
      </div>
    )
  }
}
