/* eslint-disable camelcase */
import { store } from 'store'
import * as Sentry from '@sentry/react'
import {
  isInvalidToken,
  isLogout,
  isEmailNotConfirmed,
} from 'utils/api-error-code'
import { userActions } from 'store/user'
import { errorActions } from 'store/error/reducers'
import { api } from './api-creator'

const UNKNOWN_ERROR_CODE = 'UNKNOWN_ERROR_CODE'
const UNKNOWN_ERROR_STATUS = 504
const NETWORK_ERROR = 'Network Error'
let refreshingToken = false
let pendingRequests = []

function ApiError(error) {
  const { response, config: requestConfig, stack } = error
  this.name = 'ApiError'
  this.requestConfig = requestConfig
  this.stack = stack
  if (response) {
    this.status = response.status ?? UNKNOWN_ERROR_STATUS
    if (response.data) {
      const code =
        response.data.code?.toString()?.toLowerCase() ??
        response.data.status?.toString()?.toLowerCase() ??
        response.status ??
        UNKNOWN_ERROR_CODE
      this.code = code
      this.message = response.data.message ?? NETWORK_ERROR
      this.fields = response.data.fields
    } else {
      this.code = response.status
    }
  } else {
    this.status = UNKNOWN_ERROR_STATUS
    this.code = UNKNOWN_ERROR_CODE
    this.message = NETWORK_ERROR
  }
}
ApiError.prototype = Object.create(Error.prototype)
ApiError.prototype.constructor = ApiError

function rejectPendingRequsts() {
  pendingRequests.forEach(({ requestConfig, reject }) =>
    reject(new ApiError({ code: 401, requestConfig }))
  )
}

function resolvePendingRequests(newAccessToken) {
  pendingRequests.forEach(({ requestConfig, resolve }) =>
    resolve(
      api.request({
        ...requestConfig,
        headers: {
          ...requestConfig.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      })
    )
  )
}

function logoutUser(user = {}, reason = '') {
  Sentry.captureMessage(` user force to logout with reason : ${reason} `, {
    user: {
      email: user?.email,
      id: user?.id,
    },
  })
  rejectPendingRequsts()
  store.dispatch(userActions.logout.start())
  return Promise.resolve({})
}

function refreshToken(requestConfig, state) {
  refreshingToken = true
  const { Authorization, ...headers } = requestConfig.headers
  return api
    .request({
      ...requestConfig,
      headers: {
        ...headers,
        'x-refresh-token': state.user.refresh_token || state.user.refreshToken,
      },
    })
    .then((res) => {
      const newAccessToken = res.headers['x-new-access-token']
      if (newAccessToken) {
        store.dispatch(
          userActions.update.token({ access_token: newAccessToken })
        )
        resolvePendingRequests(newAccessToken)
        return res
      }
      return logoutUser(state.user, 'cant get new access token')
    })
    .catch((error) => rejectPendingRequsts(error))
    .finally(() => {
      refreshingToken = false
      pendingRequests = []
    })
}

api.interceptors.request.use((config) => {
  const state = store.getState()
  if (config.url.indexOf('http') < 0 && state.user && state.user.access_token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${state.user.access_token}`,
      },
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const errorObj = new ApiError(error)
    const state = store.getState()
    if (
      isInvalidToken(errorObj) &&
      (state.user?.refresh_token || state.user?.refreshToken)
    ) {
      if (refreshingToken) {
        const hasXRefreshToken = !!errorObj.requestConfig.headers[
          'x-refresh-token'
        ]
        if (hasXRefreshToken) {
          // refresh token is expired too
          return logoutUser(state.user, 'x-refresh-token is returned in error')
        }
        // cocurrent request is failed due to access token is expired.
        return new Promise((resolve, reject) => {
          pendingRequests.push({
            requestConfig: errorObj.requestConfig,
            resolve,
            reject,
          })
        })
      }
      return refreshToken(errorObj.requestConfig, state)
    }
    if (isInvalidToken(errorObj)) {
      return logoutUser(state.user, 'invalid session token')
    }
    if (isLogout(errorObj)) {
      // don't think 405 is an error. it's for logout request.
      return Promise.resolve({})
    }
    if (
      // ignore youtube search error
      errorObj.requestConfig.url ===
      'https://www.googleapis.com/youtube/v3/search'
    ) {
      return Promise.resolve({})
    }
    if (!isEmailNotConfirmed(errorObj)) {
      // don't think EMAIL_NOT_CONFIRMED is an error. it's for email confirmation.
      store.dispatch(errorActions.set.apiError(errorObj))
    }
    console.log('#1 something went wrong error: ', errorObj)
    return Promise.reject(errorObj)
  }
)
