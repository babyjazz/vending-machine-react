import axios from 'axios'
import humps from 'humps'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import isArrayBuffer from 'lodash/isArrayBuffer'
import camelCase from 'lodash/camelCase'

const BASE_URL = 'https://reqres.in/api'
const defaultOptions = {
  headers: {
    method: 'GET',
  },
}

export default function request(
  url,
  withAuth = false,
  options = defaultOptions
) {
  url = BASE_URL + url
  if (withAuth) {
    // get api_key and set into options
  }

  return axios({ url, ...options })
    .then((response) => {
      const data = get(response, 'data')
      if (!isEmpty(data) && !isArrayBuffer(data)) {
        return humps.camelizeKeys(data, (key) => camelCase(key))
      }
      return data
    })
    .catch((e) => {
      const status = get(e, 'response.status')

      if (status === 401) {
        // if authened, logout
      } else if (status === 500) {
        // Internal error
      }

      throw e
    })
}
