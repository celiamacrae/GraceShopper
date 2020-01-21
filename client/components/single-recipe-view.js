import React from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'
import {loadSingleRecipe} from '../store/recipies'

class SingleRecipe extends React.Component {
  async componentDidMount() {
    const id = this.props.match.params.recipeId
    await this.props.loadSingleRecipe(id)
  }
  render() {
    return (
      <div>
        <h1>{this.props.recipe.name}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  recipe: state.recipies[0],
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  onLoadSingleRecipe: id => dispatch(loadSingleRecipe)
  //update
})

const SingleRecipeContainer = connect(mapStateToProps, mapDispatchToProps)(
  SingleRecipe
)

export default SingleRecipeContainer
