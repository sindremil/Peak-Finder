import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: "",
};

/* eslint-disable no-param-reassign */
// no-param-reassign is disabled in this method since it uses immer
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
