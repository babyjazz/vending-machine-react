import { get } from './api-creator'

function listUser(data) {
  if (data?.userId) {
    return get(`/users/${data?.userId}?delay=1`)
  }
  return get('/users?delay=1')
}

const userApi = { listUser }

export default userApi
