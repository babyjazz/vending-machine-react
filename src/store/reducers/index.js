import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from 'store/auth'

const authPersist = {
  key: 'auth',
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersist, authReducer),
})

export default rootReducer
