import { all, fork } from 'redux-saga/effects'
import { authSagas } from 'store/auth'
import { productSagas } from 'store/product'

export default function* rootSaga() {
  yield all([
    fork(authSagas.loginWatcher),
    fork(productSagas.listProductWatcher),
  ])
}
