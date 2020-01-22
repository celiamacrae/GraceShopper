import React from 'react'
import {connect} from 'react-redux'
import {loadSingleRecipe, updateRecipe} from '../store/recipies'
import {loadAllProducts} from '../store/products'
import AddIngredients from './add-ingredients'

class UpdateRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageURL: '',
      time: '',
      description: '',
      ingredients: [
        {
          name: '',
          weight: '',
          quantity: 0
        }
      ]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    const id = this.props.match.params.recipeId
    if (id) await this.props.onLoadSingleRecipe(id)
    await this.props.loadAllProducts()
    const {name, imageURL, time, description} = this.props.recipe
    const ingredients = this.props.recipe.products.map(product => ({
      name: product.name,
      weight: product.recipeProduct.weight,
      quantity: product.recipeProduct.quantity
    }))
    this.setState({name, imageURL, time, description, ingredients})
  }

  handleChange(event) {
    //if(['name', 'weight', 'quantity'].includes(event.target.name)){
    //   let ingredients = [...this.state.ingedients]
    // ingredients[event.target.dataset.id][event.target.name] = event
    // }
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateRecipe(this.props.recipe.id, this.state)
  }

  render() {
    return (
      <div id="secondP">
        <div className="profile_option">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="name">
                <small>Recipe Name:</small>
              </label>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="time">
                <small>Cooking time:</small>
              </label>
              <input
                name="time"
                type="text"
                value={this.state.time}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label htmlFor="description">
                <small>Directions:</small>
              </label>
              <input
                name="description"
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="imageURL">
                <small>Image URL:</small>
              </label>
              <input
                name="imageURL"
                type="text"
                value={this.state.imageURL}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <small>Ingredients</small>
              <ul>
                {this.state.ingredients.map((product, indx) => (
                  <div key={indx}>
                    <ol>
                      <small>{product.name}</small>
                      <div className="weightquantity">
                        <div>
                          <label htmlFor="weight">
                            <small>Weight:</small>
                          </label>
                          <input
                            name="weight"
                            type="text"
                            value={product.weight}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="quantity">
                            <small>Quantity:</small>
                          </label>
                          <input
                            name="quantity"
                            type="text"
                            value={product.quantity}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </ol>
                  </div>
                ))}
              </ul>
              <label htmlFor="Add more ingredients" />
              <small>Add more ingredients: </small>
              <button
                onClick={() => (
                  <AddIngredients
                    products={this.props.products}
                    handleChange={this.handleChange}
                  />
                )}
                type="submit"
              >
                ➕
              </button>
            </div>
            <div>
              <button type="submit" className="button3">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipe: state.recipies[0],
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  onLoadSingleRecipe: id => dispatch(loadSingleRecipe(id)),
  loadAllProducts: () => dispatch(loadAllProducts()),
  updateRecipe: (id, recipe) => dispatch(updateRecipe(id, recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe)
