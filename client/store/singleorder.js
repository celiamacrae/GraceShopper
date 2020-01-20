import axios from 'axios'
import history from '../history'

//Action Types
const GET_USER_ORDER_BY_ID = 'GET_USER_ORDER_BY_ID'

//initialState
const initialState = {}

//Action Creators
const getUserOrderById = order => ({type: GET_USER_ORDER_BY_ID, order})

//Thunk Creator
export const loadSingleOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/orderhistory/${orderId}`)
    dispatch(getUserOrderById(data))
  } catch (error) {
    console.error(error)
  }
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDER_BY_ID:
      return action.order
    default:
      return state
  }
}
