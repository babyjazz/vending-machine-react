import { takeEvery, call, put } from 'redux-saga/effects'
import { orderApi } from 'api'
import { orderActions } from './reducers'

function* purchaseOrder(action) {
  try {
    const response = yield call(orderApi.purchase, action.payload)
    yield put(orderActions.submit.success(response))
  } catch (error) {
    yield put(orderActions.submit.failure(error))
  }
}

function* purchaseOrderWatcher() {
  yield takeEvery(orderActions.submit.start.toString(), purchaseOrder)
}

const orderSagas = { purchaseOrderWatcher }

export default orderSagas
