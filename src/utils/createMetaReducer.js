import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
  meta: {
    isInitialize: false,
    isRequesting: false,
    isSuccess: false,
    isFailure: false,
  },
  data: {},
};

/**
 *
 * @param key: reducer key -> should be like action Ex. list, update, delete, create
 * @param action: action name
 * @return reducer with meta and data
 */
export function createMetaReducer(action, defaultState = initialState) {
  const reducer = createReducer(defaultState, {
    [action.request]: (state) => {
      return {
        ...state,
        ...defaultState,
        meta: { ...defaultState.meta, isRequesting: true },
      };
    },
    [action.success]: (state, { payload }) => {
      return {
        ...state,
        ...defaultState,
        meta: { ...defaultState.meta, isSuccess: true },
        data: payload,
      };
    },
    [action.failure]: (state, { payload }) => {
      return {
        ...state,
        ...defaultState,
        meta: { ...defaultState.meta, isFailure: true },
        data: payload,
      };
    },
  });
  return reducer;
}
