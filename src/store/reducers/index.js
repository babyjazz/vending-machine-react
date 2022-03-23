import { combineReducers } from 'redux'
import { userReducer } from 'store/user'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
