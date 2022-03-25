import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from 'store/auth'
import { productReducer } from 'store/product'

const authPersist = {
  key: 'auth',
  whitelist: ['data'],
  storage,
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersist, authReducer),
  product: productReducer,
})

export default rootReducer
