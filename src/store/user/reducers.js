import { combineReducers } from "@reduxjs/toolkit";
import { createActions } from "utils/createActions";
import { createMetaReducer } from "utils/createMetaReducer";

export const listUserAction = createActions("LIST_USER");

export const userReducer = combineReducers({
  list: createMetaReducer(listUserAction),
  // customKey: createReducer({...initialValue}, {
  //   [customAction.request]: (state, action) => {
  //     return {...state, value: action.payload}
  //   }
  // })
});
