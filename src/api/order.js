import { post } from './api-creator'

function purchase(data) {
  return post('/order/purchase', data)
}

const orderApi = { purchase }

export default orderApi
