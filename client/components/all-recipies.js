import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {loadAllRecipies, deleteRecipe} from '../store/recipies'
import {addToCart, gotSavedCart} from '../store/cart'
import {guestSession} from './all-products'

class Recipies extends React.Component {
  componentDidMount() {
    this.props.onLoadAllRecipies()
  }
  render() {
    const {userStatus, recipies, userId} = this.props
    return (
      <div id="main">
        {userStatus === 'admin' ? (
          <div className="addrecipe-btn">
            <button className="button3">
              <Link to="/recipies/add">Add Recipe</Link>
            </button>{' '}
          </div>
        ) : null}
        <ul className="cards">
          {recipies.map(recipe => {
            return (
              <li key={recipe.id}>
                <div className="card">
                  <img src={recipe.imageURL} height="500px" width="400px" />
                  <div className="card_content">
                    <Link to={`/recipies/${recipe.id}`}>
                      <h4 className="price">{recipe.name}</h4>
                    </Link>

                    {userStatus === 'admin' ? (
                      <div>
                        <button
                          onClick={() => {
                            this.props.deletingRecipe(recipe.id)
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
                            if (userId) {
                              recipe.products.map(product => {
                                for (
                                  let i = 0;
                                  i < product.recipeProduct.quantity;
                                  i++
                                ) {
                                  this.props.addingToCart(product, userId)
                                }
                              })
                            } else {
                              recipe.products.map(product => {
                                for (
                                  let i = 0;
                                  i < product.recipeProduct.quantity;
                                  i++
                                ) {
                                  guestSession(this.props.addGuestCart, product)
                                }
                              })
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

const mapStateToProps = state => ({
  recipies: state.recipies,
  userStatus: state.user.status,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => {
  return {
    addingToCart: function(product, userId) {
      const thunk = addToCart(product, userId)
      dispatch(thunk)
    },
    onLoadAllRecipies: function() {
      const thunk = loadAllRecipies()
      dispatch(thunk)
    },
    addGuestCart: function(items) {
      gotSavedCart(items)
    },
    deletingRecipe: id => {
      const thunk = deleteRecipe(id)
      dispatch(thunk)
    }
    //addRecipe
  }
}

const allRecipiesContainer = connect(mapStateToProps, mapDispatchToProps)(
  Recipies
)

export default allRecipiesContainer
