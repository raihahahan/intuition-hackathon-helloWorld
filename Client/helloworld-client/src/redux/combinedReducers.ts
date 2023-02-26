import autoCompleteSymbolsReducer from "@/features/market/market-slice";
import themeReducer from "@/features/theme/theme-slice";
import { combineReducers } from "@reduxjs/toolkit";

const searchCombinedReducer = combineReducers({
  result: autoCompleteSymbolsReducer,
});

export const rootReducer = combineReducers({
  theme: themeReducer,
  search: searchCombinedReducer,
});
