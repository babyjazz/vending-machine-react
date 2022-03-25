import { get } from './api-creator'

function list() {
  return get('/products/')
}

const productApi = { list }

export default productApi
