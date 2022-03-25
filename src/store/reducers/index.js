import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userReducer } from 'store/user'

const userPersist = {
  key: 'user',
  storage,
}

const rootReducer = combineReducers({
  user: persistReducer(userPersist, userReducer),
})

export default rootReducer
