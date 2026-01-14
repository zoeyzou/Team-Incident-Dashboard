import { combineReducers } from "@reduxjs/toolkit";
import { modalReducer } from "./modalSlice";

export const uiReducer = combineReducers({
  modal: modalReducer,
});

export type UiState = ReturnType<typeof uiReducer>;
