import { post } from './api-creator'

function login(data) {
  return post('/user/login', data)
}

const userApi = { login }

export default userApi
