import { combineReducers } from '@reduxjs/toolkit'
import { userReducer } from 'store/user'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
