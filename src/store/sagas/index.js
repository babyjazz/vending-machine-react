import { all, fork } from 'redux-saga/effects'
import { authSagas } from 'store/auth'
import { orderSagas } from 'store/order'
import { productSagas } from 'store/product'

export default function* rootSaga() {
  yield all([
    fork(authSagas.loginWatcher),
    fork(productSagas.listProductWatcher),
    fork(orderSagas.purchaseOrderWatcher),
  ])
}
