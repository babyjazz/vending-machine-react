import { takeEvery, call, put } from 'redux-saga/effects'
import { userApi } from 'api'
import { authActions } from './reducers'

function* login(action) {
  try {
    const response = yield call(userApi.login, action.payload)
    yield put(authActions.login.success(response))
  } catch (error) {
    console.log(error)
    yield put(authActions.login.failure(error))
  }
}

function* loginWatcher() {
  yield takeEvery(authActions.login.start.toString(), login)
}

const authSagas = { loginWatcher }

export default authSagas
