import themeReducer from "@/features/theme/theme-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  theme: themeReducer,
});
