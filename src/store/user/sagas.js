import { fork, take, call, put } from 'redux-saga/effects'
import { listUserRequest } from 'api'
import { listUserAction } from './reducers'

function* listUserWatcher() {
  while (true) {
    const { payload } = yield take(listUserAction.request)
    try {
      const response = yield call(listUserRequest, payload)
      yield put(listUserAction.success(response.data))
    } catch (error) {
      yield put(listUserAction.failure(error))
    }
  }
}

export default function* rootSaga() {
  yield fork(listUserWatcher)
}
