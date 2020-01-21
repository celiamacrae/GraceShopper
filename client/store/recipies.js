import axios from 'axios'

//ACTION TYPE
const GET_ALL_RECIPIES = 'GET_ALL_RECIPIES'
const GET_SINGLE_RECIPE = 'GET_SINGLE_RECIPE'

//ACTION CREATOR
export const getAllRecipies = recipies => ({type: GET_ALL_RECIPIES, recipies})
export const getSingleRecipe = recipe => ({type: GET_SINGLE_RECIPE, recipe})

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

//INITIAL STATE
const defaultRecipies = []

//RECIPIES REDUCER
export default function(state = defaultRecipies, action) {
  switch (action.type) {
    case GET_ALL_RECIPIES:
      return [action.recipies]
    case GET_SINGLE_RECIPE:
      return [action.recipe]
    default:
      return state
  }
}
