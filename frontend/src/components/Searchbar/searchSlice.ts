import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchValue: string;
}

const initialState: SearchState = {
  searchValue: "",
};

/* eslint-disable no-param-reassign */
// no-param-reassign is disabled in this method since it uses immer
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
