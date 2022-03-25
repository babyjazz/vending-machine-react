import { handleActions, createActions } from 'redux-actions'

const options = {
  prefix: 'USER',
}

const initialStatus = {
  loading: false,
  success: false,
  data: {},
  failure: false,
  error: null,
}

export const userActions = createActions(
  {
    LIST: {
      START: undefined,
      SUCCESS: undefined,
      FAILURE: undefined,
    },
  },
  options,
)

export const userReducer = handleActions(
  new Map([
    [
      userActions.list.start,
      (state) => ({
        ...state,
        list: {
          ...initialStatus,
          loading: true,
        },
      }),
    ],
    [
      userActions.list.success,
      (state, action) => ({
        ...state,
        list: {
          ...initialStatus,
          success: true,
          data: action.payload,
        },
      }),
    ],
    [
      userActions.list.failure,
      (state, action) => ({
        ...state,
        list: {
          ...initialStatus,
          failure: true,
          error: action.payload,
        },
      }),
    ],
  ]),
  { list: initialStatus },
  options,
)
