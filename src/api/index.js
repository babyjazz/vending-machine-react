import request from 'utils/request'

export async function listUserRequet({ userId }) {
  return request(`/users/${userId}`)
}