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

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // TODO checkc invalid token or unauthorized then logout
    // const state = store.getState()
    // if (isInvalidToken(errorObj)) {
    // return login function here
    // }

    return Promise.reject(error)
  },
)
