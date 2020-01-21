import React from 'react'
import {connect} from 'react-redux'
import {loadSingleRecipe} from '../store/recipies'

class UpdateRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      imageURL: '',
      time: '',
      description: '',
      ingredients: {
        name: '',
        weight: '',
        quantity: ''
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    const id = this.props.match.params.recipeId
    if (id) await this.props.loadSingleRecipe(id)
    const {name, imageURL, time, description} = this.props.recipe
  }
  render() {
    return <div />
  }
}

const mapStateToProps = state => ({
  recipe: state.recipies[0],
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  onLoadSingleRecipe: id => dispatch(loadSingleRecipe(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecipe)
