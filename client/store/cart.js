import axios from 'axios'
import history from '../history'

//ACTION TYPE
const GOT_SAVED_CART = 'GET_SAVED_CART'
const GET_ITEMS = 'GET_ITEMS'
const EMPTY_CART = 'EMPTY_CART'
const ADDED_TO_CART = 'ADD_TO_CART'
const REMOVED_FROM_CART = 'REMOVE_FROM_CART'
const GET_CART_AMOUNT = 'GET_CART_AMOUNT'
const GET_CART_TOTAL = 'GET_CART_TOTAL'
const GET_CART_MAP = 'GET_CART_MAP'
//ACTION CREATOR
// export const getSavedCart = cart => ({type: GET_SAVED_CART, cart}) *//get cart from database

//when user checkout
export const emptyCart = () => ({type: EMPTY_CART})

export const getItems = () => ({type: GET_ITEMS})

export const addedToCart = items => ({type: ADDED_TO_CART, items})

export const gotSavedCart = items => ({type: GOT_SAVED_CART, items})

export const removedFromCart = product => ({type: REMOVED_FROM_CART, product})

export const getCartAmount = () => ({type: GET_CART_AMOUNT}) //get amount of items in cart

export const getCartTotal = () => ({type: GET_CART_TOTAL}) //get total price of items in cart

export const getCartMap = cartMap => ({type: GET_CART_MAP, cartMap}) //get cart map

//THUNK CREATOR ****
export const loadCart = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${id}/cart`)
    dispatch(gotSavedCart(data))

    let cartMap = {}
    data.forEach(item => {
      cartMap[item.id] = item.ProductOrder.quantity
    })

    console.log('CARTMAO', cartMap)
    dispatch(getCartMap(cartMap))
  } catch (error) {
    console.error(error)
  }
}

export const fulfillCart = (id, info, items) => async dispatch => {
  try {
    await axios.put(`/api/users/${id}/cart/fulfilled`, {
      info: info,
      items: items
    })

    sessionStorage.clear()
    dispatch(emptyCart())
  } catch (error) {
    console.error(error)
  }
}

export const addToCart = (product, userId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userId}/cart`, product)
    dispatch(addedToCart(data))

    console.log('DATA', data)

    let cartMap = {}
    data.forEach(item => {
      cartMap[item.id] = item.ProductOrder.quantity
    })

    console.log('CARTMAO', cartMap)
    dispatch(getCartMap(cartMap))
  } catch (error) {
    console.error(error)
  }
}

export const removeFromCart = (product, userId) => async dispatch => {
  try {
    const {data} = await axios.delete(`api/users/${userId}/cart`, {
      data: product
    })
    dispatch(removedFromCart(data))
  } catch (error) {
    console.error(error)
  }
}

//INITIAL STATE
const initialState = {
  items: [],
  total: 0,
  amount: 0,
  cartMap: {}
}
export const getCartAmountFunc = items => {
  if (items[0])
    return items.reduce((acc, item) => acc + item.ProductOrder.quantity, 0)
  else return 0
}

export const getCartTotalFunc = items => {
  console.log('HERE', items)
  if (items[0])
    return items.reduce(
      (total, item) => total + item.price * item.ProductOrder.quantity,
      0
    )
  else return 0
}

//PRODUCTS REDUCER
export default function(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case GOT_SAVED_CART:
      return {...state, items: action.items}

    case GET_ITEMS:
      return state

    case EMPTY_CART:
      return initialState

    case ADDED_TO_CART:
      return {...state, items: action.items}

    case REMOVED_FROM_CART: {
      return {...state, items: action.product}
    }

    case GET_CART_MAP: {
      console.log('IN REDUCER', action.cartMap)
      return {...state, cartMap: action.cartMap}
    }

    case GET_CART_AMOUNT:
      return {...state, amount: getCartAmountFunc(state.items)}

    case GET_CART_TOTAL: {
      return {...state, total: getCartTotalFunc(state.items)}
    }
    default:
      return state
  }
}
