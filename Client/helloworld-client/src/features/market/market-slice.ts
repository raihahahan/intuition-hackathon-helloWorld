import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getSymbolsAPI from "./market-api-client";
import { searchSymbolStateType } from "./market-types";

export const getAutoCompleteSymbols = createAsyncThunk(
  "autocomplete/get",
  async (args: { query: string }, thunkAPI) => {
    const res = await getSymbolsAPI("NASDAQ");
    return res;
  }
);

const initialState: string[] = [];

export const autoCompleteSymbolsSlice = createSlice({
  name: "autocompleteSymbols",
  initialState,
  reducers: {
    clearAutocomplete: (state: string[]) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAutoCompleteSymbols.fulfilled,
      (state: string[], action: { payload: string[] }) => {
        return action.payload;
      }
    );
  },
});

export const { clearAutocomplete } = autoCompleteSymbolsSlice.actions;
export const selectAutoCompleteSymbols: (
  state: searchSymbolStateType
) => string[] = (state) => state.search.result;
const autoCompleteSymbolsReducer = autoCompleteSymbolsSlice.reducer;
export default autoCompleteSymbolsReducer;
