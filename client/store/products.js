import axios from 'axios'
import history from '../history'

//ACTION TYPE
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//ACTION CREATOR
export const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})

//THUNK CREATOR
export const loadAllProducts = () => async dispatch => {
  try {
    //check with backend!!!!!
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const defaultProducts = []

//PRODUCTS REDUCER
export default function(state = defaultProducts, action) {
  console.log(action)
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
