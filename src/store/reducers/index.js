import { combineReducers } from "@reduxjs/toolkit";
import { userReducer as user } from "store/user";

export default combineReducers({
  user,
});
