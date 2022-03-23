import { takeEvery, call, put } from 'redux-saga/effects'
import { userApi } from 'api'
import { userActions } from './reducers'

function* listUser(action) {
  try {
    const response = yield call(userApi.listUser, action.payload)
    yield put(userActions.list.success(response))
  } catch (error) {
    yield put(userActions.list.failure(error))
  }
}

function* listUserWatcher() {
  yield takeEvery(userActions.list.start.toString(), listUser)
}

const userSagas = { listUserWatcher }

export default userSagas
