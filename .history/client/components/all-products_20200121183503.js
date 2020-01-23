import React from 'react'
import {Link} from 'react-router-dom'

export const guestSession = (addGuestCart, product) => {
  if (sessionStorage.guest === undefined) {
    let cart = []
    product.ProductOrder = {
      quantity: 1
    }
    cart.push(product)
    window.sessionStorage.setItem('guest', JSON.stringify(cart))
  } else {
    let cart = JSON.parse(sessionStorage.getItem('guest'))
    let a = cart.slice()
    let arr = cart.filter(el => el.id === product.id)
    if (arr.length === 0) {
      product.ProductOrder = {
        quantity: 1
      }
    }
    let found = false
    a.forEach(el => {
      if (el.id === product.id) {
        found = true
        el.ProductOrder.quantity++
      }
    })
    if (found === false) a.push(product)
    window.sessionStorage.setItem('guest', JSON.stringify(a))
  }
  const guestCart = JSON.parse(sessionStorage.getItem('guest'))
  addGuestCart(guestCart)
}
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
          <div>
            <button className="btn">
              <Link to="/add">Add Product</Link>
            </button>
          </div>
        ) : (
          <h1>Products: </h1>
        )}
        <ul className="cards">
          {products.map(product => {
            return (
              <li key={product.id}>
                <div className="card">
                  <img src={product.imgSrc} height="250px" width="250px" />
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
                          onClick={() => {
                            //checks for guest or user
                            if (this.props.userId) {
                              this.props.add(
                                product,
                                this.props.userId,
                                products.length
                              )
                            } else {
                              guestSession(this.props.addGuestCart, product)
                            }
                          }}
                          type="submit"
                        >
                          Add to Cart
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
