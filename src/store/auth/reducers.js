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
    LOGOUT: {
      START: undefined,
      SUCCESS: undefined,
      FAILURE: undefined,
    },
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
      authActions.logout.start,
      (state) => ({
        ...state,
        logout: {
          ...initialStatus,
          loading: true,
        },
      }),
    ],
    [
      authActions.logout.success,
      (state, action) => ({
        ...state,
        logout: {
          ...initialStatus,
          success: true,
          data: action.payload,
        },
      }),
    ],
    [
      authActions.logout.failure,
      (state, action) => ({
        ...state,
        logout: {
          ...initialStatus,
          failure: true,
          error: action.payload,
        },
      }),
    ],
  ]),
  { login: initialStatus },
  options,
)
