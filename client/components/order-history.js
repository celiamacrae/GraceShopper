import React from 'react'
import {loadUserOrders} from '../store/orders'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import SingleOrderHistory from './single-order-history'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.onLoadUserOrders()
  }

  render() {
    console.log('ORDER', this.props)
    // console.log("HERE", props)

    return (
      <div>
        <div className="allOrderHistory">
          <h1>Order History:</h1>
          <div className="orderList">
            {this.props.userOrders.map(order => {
              let date = order.updatedAt.split('T')
              return (
                <div key={order.id}>
                  <p>Order ID: {order.id}</p>
                  <p>Order Date: {date[0]}</p>
                  <Link to={`/user/orders/${order.id}`}>Order Details</Link>
                  <hr />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    userOrders: state.orders
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onLoadUserOrders: function() {
      const userId = ownProps.userid
      const thunk = loadUserOrders(userId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
