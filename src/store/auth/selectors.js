export const auth = (state) => state?.auth?.data || {}

export const accessToken = (state) => state?.auth?.data?.accessToken

export const login = (state) => state?.auth?.login
