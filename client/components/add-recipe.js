import React from 'react'
import {connect} from 'react-redux'
import {addRecipe, loadAllRecipies} from '../store/recipies'
import {loadAllProducts} from '../store/products'
import AddIngredientsForNewRecipe from './add-ingredients-for-new-recipe'
import history from '../history'

class AddRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeName: '',
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
    await this.props.loadAllProducts()
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
      this.props.addRecipe(this.state)
      this.props.onLoadAllRecipies()
      history.push(`/recipies`)
    }
  }
  render() {
    return (
      <div id="main">
        <div className="profile_option">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="recipeName">
                <small>Recipe Name:</small>
              </label>
              <input
                name="recipeName"
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
              <label htmlFor="Add more ingredients" />
              <small>Add ingredients: </small>
              <input
                value="➕"
                onClick={() => this.addIngredients()}
                type="button"
              />
              <AddIngredientsForNewRecipe
                products={this.props.products}
                ingredients={this.state.ingredients}
                handleChange={this.handleChange}
              />
            </div>
            <div>
              <button type="submit" className="button3">
                Create new recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  onLoadAllRecipies: () => dispatch(loadAllRecipies()),
  loadAllProducts: () => dispatch(loadAllProducts()),
  addRecipe: recipe => dispatch(addRecipe(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)
