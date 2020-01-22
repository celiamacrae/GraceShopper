import axios from 'axios'
import history from '../history'

//ACTION TYPE
const GET_ALL_RECIPIES = 'GET_ALL_RECIPIES'
const GET_SINGLE_RECIPE = 'GET_SINGLE_RECIPE'
const DELETED_RECIPE = 'DELETED_RECIPE'

//ACTION CREATOR
export const getAllRecipies = recipies => ({type: GET_ALL_RECIPIES, recipies})
export const getSingleRecipe = recipe => ({type: GET_SINGLE_RECIPE, recipe})
export const deletedRecipe = recipies => ({type: DELETED_RECIPE, recipies})

//THUNK CREATOR
export const loadAllRecipies = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/recipies')
    dispatch(getAllRecipies(data))
  } catch (error) {
    console.error(error)
  }
}

export const loadSingleRecipe = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/recipies/${id}`)
    dispatch(getSingleRecipe(data))
  } catch (error) {
    console.error(error)
  }
}

export const deleteRecipe = id => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/recipies/${id}`)
    dispatch(deletedRecipe(data))
  } catch (error) {
    console.error(error)
  }
}

// export const addRecipe

export const updateRecipe = (id, recipe) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/recipies/${id}`, recipe)
    dispatch(getSingleRecipe(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const defaultRecipies = []

//RECIPIES REDUCER
export default function(state = defaultRecipies, action) {
  switch (action.type) {
    case GET_ALL_RECIPIES:
      return action.recipies
    case GET_SINGLE_RECIPE:
      return [action.recipe]
    case DELETED_RECIPE:
      return action.recipies
    default:
      return state
  }
}
