import React from 'react'
import {connect} from 'react-redux'
import {
  loadSingleRecipe,
  updateRecipe,
  loadAllRecipies
} from '../store/recipies'
import {loadAllProducts} from '../store/products'
import AddIngredients from './add-ingredients'
import history from '../history'

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
          id: null,
          name: '',
          weight: '',
          quantity: 1
        }
      ]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    const id = this.props.match.params.recipeId
    await this.props.loadAllProducts()
    if (id) await this.props.onLoadSingleRecipe(id)
    const {name, imageURL, time, description} = this.props.recipe
    const ingredients = this.props.recipe.products.map(product => ({
      id: product.id,
      name: product.name,
      weight: product.recipeProduct.weight,
      quantity: product.recipeProduct.quantity
    }))
    this.setState({name, imageURL, time, description, ingredients})
  }

  handleChange(event) {
    if (['name'].includes(event.target.name)) {
      const productNameIdAt = event.target.value.split('*')
      let ingredients = [...this.state.ingredients]
      ingredients[productNameIdAt[2]][event.target.name] = productNameIdAt[0]
      ingredients[productNameIdAt[2]].id = Number(productNameIdAt[1])
      this.setState({ingredients})
    } else if (['weight', 'quantity'].includes(event.target.name)) {
      let ingredients = [...this.state.ingredients]
      ingredients[event.target.size - 1][event.target.name] = event.target.value
      this.setState({ingredients})
    } else
      this.setState({
        [event.target.name]: event.target.value
      })
  }

  addIngredients(event) {
    this.setState(prevState => ({
      ingredients: [
        ...prevState.ingredients,
        {
          id: null,
          name: '',
          weight: '',
          quantity: 1
        }
      ]
    }))
  }

  handleSubmit(event) {
    event.preventDefault()
    if (
      this.state.ingredients.weight !== '' &&
      this.state.ingredients.quantity !== '' &&
      this.state.ingredients.name !== '' &&
      this.state.ingredients.id !== null
    ) {
      this.props.updateRecipe(this.props.recipe.id, this.state)
      this.props.onLoadAllRecipies()
      history.push(`/recipies`)
    }
  }
  render() {
    const ingredientsToShow = this.state.ingredients.slice(
      0,
      this.props.recipe.products.length
    )
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
                {ingredientsToShow.map((product, indx) => (
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
                            size={indx + 1}
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
                            size={indx + 1}
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
              <input
                value="➕"
                onClick={() => this.addIngredients()}
                type="button"
              />
              <AddIngredients
                products={this.props.products}
                ingredients={this.state.ingredients}
                startPoint={this.props.recipe.products.length}
                handleChange={this.handleChange}
              />
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
  onLoadAllRecipies: () => dispatch(loadAllRecipies()),
  loadAllProducts: () => dispatch(loadAllProducts()),
  updateRecipe: (id, recipe) => dispatch(updateRecipe(id, recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe)
