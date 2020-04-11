import get from 'lodash/get'

export const listUsers = (state) => get(state, 'user.list', [])
export const listUsersMeta = (state) => get(state, 'user.list.meta', {})
export const listUsersData = (state) => get(state, 'user.list.data', [])
