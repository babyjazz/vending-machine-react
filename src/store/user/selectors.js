import get from 'lodash/get'

export const selectUser = state => get(state, 'user')