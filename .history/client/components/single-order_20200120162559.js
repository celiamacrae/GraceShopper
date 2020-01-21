import React from 'react'
import {loadUserOrders} from '../store/orders'
import {connect} from 'react-redux'

export const SingleOrder = props => {
  console.log(props)
  return (
    <div>
      <h1>This is a order</h1>
    </div>
  )
}
