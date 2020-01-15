import axios from 'axios'
import history from '../history'

//ACTION TYPE
const GET_SAVED_CART = 'GET_SAVED_CART'
const GET_ITEMS = 'GET_ITEMS'
const EMPTY_CART = 'EMPTY_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const GET_CART_AMOUNT = 'GET_CART_AMOUNT'
const GET_CART_TOTAL = 'GET_CART_TOTAL'

//ACTION CREATOR
// export const getSavedCart = cart => ({type: GET_SAVED_CART, cart}) *//get cart from database

export const emptyCart = () => ({type: EMPTY_CART})

export const getItems = () => ({type: GET_ITEMS})

export const addToCart = product => ({type: ADD_TO_CART, product})

export const removeFromCart = product => ({type: REMOVE_FROM_CART, product})

export const getCartAmount = () => ({type: GET_CART_AMOUNT}) //get amount of items in cart

export const getCartTotal = () => ({type: GET_CART_TOTAL}) //get total price of items in cart

//THUNK CREATOR **** Test when Cart is added to Database
// export const loadCart = (id) => async dispatch => {
//   try {
//     const {data} = await axios.get(`/api/user/${id}/cart`)
//     dispatch(getSavedCart(data))
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const saveCart = (id, items) => {
//   return async () => {
//   await axios.post(`/api/user/${id}/cart`, items)
//   }
// }

//INITIAL STATE
const initialState = {
  items: [],
  total: 0,
  amount: 0
}

//PRODUCTS REDUCER
export default function(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case GET_SAVED_CART:
      return {...state, items: action.items}
    case GET_ITEMS:
      return state
    case EMPTY_CART:
      return initialState
    case ADD_TO_CART:
      return {...state, items: [...state.items, action.product]}
    case REMOVE_FROM_CART: { //have to test if these functions work
      const productIdx = state.items.findIndex(
        product => product.id === action.product.id
      ) //find product idx in cart
      const copyCart = state.items.slice()
      copyCart.splice(productIdx, 1)
      return {...state, items: copyCart}
    }
    case GET_CART_AMOUNT: //have to test if these functions work
      return {...state, amount: state.items.length}
    case GET_CART_TOTAL: { //have to test if these functions work
      const totalPrice = state.items.reduce((total, product) => {
        return total + product.price
      }, 0)
      return {...state, total: totalPrice}
    }
    default:
      return state
  }
}
