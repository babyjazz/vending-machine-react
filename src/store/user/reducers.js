import { createReducer } from "@reduxjs/toolkit";
import { createActions, requestActions } from "utils/createActions";

const initialState = {
  isInitialize: false,
  isRequesting: false,
  isSuccess: false,
  isFailure: false,
  data: undefined,
};

export const listUserAction = createActions("LIST_USER", requestActions);

const userSlice = createReducer(
  { ...initialState, isInitialize: true },
  {
    [listUserAction.request]: (state) => {
      state.user = { ...initialState, isRequesting: true };
    },
    [listUserAction.success]: (state, { payload }) => {
      state.user = { ...initialState, isSuccess: true, data: payload };
    },
    [listUserAction.failure]: (state, { payload }) => {
      state.user = { ...initialState, isFailure: true, data: payload };
    },
  }
);

export const userReducer = userSlice;
