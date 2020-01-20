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

    return (
      <div>
        <h1>Order Details:</h1>
        <p>Order ID: {this.props.singleOrder.id}</p>
        <p>Ordered On: {this.props.singleOrder.date}</p>
        <p>
          Shipped To: {this.props.singleOrder.firstName}{' '}
          {this.props.singleOrder.lastName}
        </p>
        <p>{this.props.singleOrder.address}</p>

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
    )
  }
}

const mapStateToProps = function(state) {
  return {
    singleOrder: state.singleorder
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
