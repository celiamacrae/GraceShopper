import axios from 'axios'
import history from '../history'
//INITIAL STATE
const defaultProducts = []

//ACTION TYPE
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
//ACTION CREATOR
export const deleteProduct = productId => ({type: DELETE_PRODUCT, productId})
export const getAllProducts = products => ({type: GET_ALL_PRODUCTS, products})
export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})
export const createProduct = product => ({
  type: ADD_PRODUCT,
  product
})
//THUNK CREATOR

export const subtractFromProductStock = async product => {
  try {
    await axios.post(`/api/products/${product.id}`, product)
  } catch (error) {
    console.error(error)
  }
}

export const addProduct = product => async dispatch => {
  try {
    const res = await axios.put('/api/products', product)
    dispatch(createProduct(res.data))
  } catch (error) {
    console.error(error)
  }
}

export const loadAllProducts = userId => async dispatch => {
  try {
    const res = await axios.get('/api/products', {data: userId})
    dispatch(getAllProducts(res.data || defaultProducts))
  } catch (error) {
    console.error(error)
  }
}
export const loadSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}
export const deletedProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`)
    dispatch(deleteProduct(id))
  } catch (error) {
    console.error(error)
  }
}
export const updateSingleProduct = (id, product) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/${id}`, product)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}
//PRODUCTS REDUCER
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products

    case GET_SINGLE_PRODUCT:
      return [action.product]

    case DELETE_PRODUCT:
      return state.filter(el => el.id !== action.productId)
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
