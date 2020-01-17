import axios from 'axios'
import history from '../history'

//Action Types
const GET_USER_ORDERS = 'GET_USER_ORDERS'

//initialState
const initialState = []

//Action Creators
const getUserOrders = orders => ({type: GET_USER_ORDERS, orders})

//Thunk Creator
export const loadUserOrders = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}/orderhistory`)
    dispatch(getUserOrders(data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders
    default:
      return state
  }
}
