import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./modalSlice";

const uiReducer = combineReducers({
  modal: modalReducer,
});

export default uiReducer;
