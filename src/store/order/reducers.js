import { handleActions, createActions } from 'redux-actions'

const options = {
  prefix: 'ORDER',
}

const initialStatus = {
  loading: false,
  success: false,
  data: undefined,
  failure: false,
  error: null,
}

export const orderActions = createActions(
  {
    SUBMIT: {
      START: undefined,
      SUCCESS: undefined,
      FAILURE: undefined,
      RESET: undefined,
    },
  },
  options,
)

export const orderReducer = handleActions(
  new Map([
    [
      orderActions.submit.start,
      (state) => ({
        ...state,
        submit: {
          ...initialStatus,
          loading: true,
        },
      }),
    ],
    [
      orderActions.submit.success,
      (state, action) => ({
        ...state,
        submit: {
          ...initialStatus,
          success: true,
          data: action.payload?.data,
        },
      }),
    ],
    [
      orderActions.submit.failure,
      (state, action) => ({
        ...state,
        submit: {
          ...initialStatus,
          failure: true,
          error: action.payload,
        },
      }),
    ],
    [
      orderActions.submit.reset,
      (state) => ({
        ...state,
        submit: initialStatus,
      }),
    ],
  ]),
  { submit: initialStatus },
  options,
)
