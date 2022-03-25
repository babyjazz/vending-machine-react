import { store } from 'store'
import { api } from './api-creator'

api.interceptors.request.use((config) => {
  const state = store.getState()
  if (state?.user?.accessToken) {
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

function ApiError(error) {
  const { response } = error
  this.response = response
}

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const errorObj = new ApiError(error)
    // NOTE can implement refresh token here when statusCode and message means to refresh token

    return Promise.reject(errorObj)
  },
)
