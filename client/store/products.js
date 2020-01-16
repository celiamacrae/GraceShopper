import axios from 'axios'
import history from '../history'
//INITIAL STATE
const defaultProducts = []

//ACTION TYPE
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
//ACTION CREATOR
export const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})
export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})
//THUNK CREATOR
export const loadAllProducts = () => async dispatch => {
  try {
    //check with backend!!!!!
    const res = await axios.get('/api/products', {user: true})
    dispatch(getAllProducts(res.data || defaultProducts))
  } catch (error) {
    console.error(error)
  }
}
export const loadSingleProduct = id => async dispatch => {
  try {
    //check with backend!!!!!
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

//PRODUCTS REDUCER
export default function(state = defaultProducts, action) {
  console.log(action)
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products

    case GET_SINGLE_PRODUCT:
      return [action.product]
    default:
      return state
  }
}
