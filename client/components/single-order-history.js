import React from 'react'
import {loadSingleOrder} from '../store/singleorder'
import {connect} from 'react-redux'

class SingleOrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.onLoadSingleOrder()
  }

  render() {
    console.log('SINGLE ORDERERRR', this.props)
    // let date = this.props.singleOrder.date.split('T')
    // // console.log(date)
    if (this.props.singleOrder.id === undefined) {
      this.props.history.push('/user/orders')
    }

    console.log('DATE', this.props.singleOrder.updatedAt)

    let shortdate = this.props.singleOrder.updatedAt

    if (this.props.singleOrder.updatedAt) {
      let date = this.props.singleOrder.updatedAt.split('T')
      shortdate = date[0]
    }

    let orderinfo = []

    if (this.props.singleOrder.orderInfo) {
      orderinfo = this.props.singleOrder.orderInfo.split('*')
      console.log('INFO', orderinfo)
    }

    return (
      <div>
        <h1>Order Details:</h1>
        <div>
          <p>Order ID: {this.props.singleOrder.id}</p>

          <p>Ordered On: {shortdate}</p>
          <p>
            Shipped To: {orderinfo[1]} {orderinfo[2]}
          </p>
          <p>{orderinfo[3]}</p>
          <p>Email: {orderinfo[0]}</p>
          <br />

          <p>Items in Order:</p>
          {this.props.singleOrder.products ? (
            this.props.singleOrder.products.map(product => {
              return (
                <div key={product.id}>
                  <p>
                    {product.ProductOrder.quantity} {product.name}
                  </p>
                </div>
              )
            })
          ) : (
            <h1>loading</h1>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    singleOrder: state.singleorder,
    user: state.user
  }
}

const mapDispatchToProps = function(dispatch, ownProps) {
  return {
    onLoadSingleOrder: function() {
      console.log('LOOKHERE', ownProps)
      // const userId = this.props.match.userId
      const orderId = ownProps.match.params.orderId
      const thunk = loadSingleOrder(orderId)
      dispatch(thunk)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrderHistory)
// export default SingleOrderHistory
