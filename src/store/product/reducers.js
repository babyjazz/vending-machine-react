import { handleActions, createActions } from 'redux-actions'

const options = {
  prefix: 'PRODUCT',
}

const initialStatus = {
  loading: false,
  success: false,
  data: undefined,
  failure: false,
  error: null,
}

export const productActions = createActions(
  {
    LIST: {
      START: undefined,
      SUCCESS: undefined,
      FAILURE: undefined,
    },
  },
  options,
)

export const productReducer = handleActions(
  new Map([
    [
      productActions.list.start,
      (state) => ({
        ...state,
        list: {
          ...initialStatus,
          loading: true,
        },
      }),
    ],
    [
      productActions.list.success,
      (state, action) => ({
        ...state,
        list: {
          ...initialStatus,
          success: true,
          data: action.payload?.data,
        },
      }),
    ],
    [
      productActions.list.failure,
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
