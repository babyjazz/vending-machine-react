import { handleActions, createActions } from 'redux-actions'

const options = {
  prefix: 'AUTH',
}

const initialStatus = {
  loading: false,
  success: false,
  data: {},
  failure: false,
  error: null,
}

export const authActions = createActions(
  {
    LOGIN: {
      START: undefined,
      SUCCESS: undefined,
      FAILURE: undefined,
    },
    LOGOUT: undefined,
  },
  options,
)

export const authReducer = handleActions(
  new Map([
    [
      authActions.login.start,
      (state) => ({
        ...state,
        login: {
          ...initialStatus,
          loading: true,
        },
      }),
    ],
    [
      authActions.login.success,
      (state, action) => ({
        ...state,
        data: action.payload?.data,
        login: {
          ...initialStatus,
          success: true,
          data: action.payload,
        },
      }),
    ],
    [
      authActions.login.failure,
      (state, action) => ({
        ...state,
        login: {
          ...initialStatus,
          failure: true,
          error: action.payload,
        },
      }),
    ],
    [
      authActions.logout,
      (state) => ({
        ...state,
        data: null,
        login: {
          ...initialStatus,
        },
      }),
    ],
  ]),
  { login: initialStatus },
  options,
)
