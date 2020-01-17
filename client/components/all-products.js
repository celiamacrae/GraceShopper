import React from 'react'
import {Link} from 'react-router-dom'
export default class Products extends React.Component {
  componentDidMount() {
    this.props.onLoadAllProducts()
  }

  render() {
    const userStatus = this.props.userStatus
    const products = this.props.products
    return (
      <div id="mainBody">
        {userStatus === 'admin' ? (
          <button className="button3">
            <Link to="/add">Add</Link>
          </button>
        ) : (
          <h1>Products: </h1>
        )}
        <ul className="cards">
          {products.map(product => {
            return (
              <li key={product.id}>
                <div className="card">
                  <img src={product.imgSrc} height="200px" width="200px" />
                  <div className="card_content">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                    <h4 className="price"> ${product.price}</h4>

                    {userStatus === 'admin' ? (
                      <div>
                        <button
                          onClick={() => {
                            this.props.delete(product.id)
                          }}
                          type="submit"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => this.props.add(product)}
                          type="submit"
                        >
                          Add to Cart
                          {console.log('after add to cart', this.props)}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
