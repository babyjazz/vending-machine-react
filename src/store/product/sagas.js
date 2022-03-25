import { takeEvery, call, put } from 'redux-saga/effects'
import { productApi } from 'api'
import { orderActions } from 'store/order'
import { productActions } from './reducers'

function* listProduct(action) {
  try {
    const response = yield call(productApi.list, action.payload)
    yield put(productActions.list.success(response))
  } catch (error) {
    yield put(productActions.list.failure(error))
  }
}

function* listProductWatcher() {
  yield takeEvery(productActions.list.start.toString(), listProduct)
  yield takeEvery(orderActions.submit.success.toString(), listProduct)
}

const productSagas = { listProductWatcher }

export default productSagas
