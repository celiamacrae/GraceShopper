import React from 'react'

export default class Products extends React.Component {
  componentDidMount() {
    this.props.onLoadAllProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h1>Products: </h1>
        {products.map(product => {
          return (
            <div className="product row" key={product.id}>
              <p>{product.name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
