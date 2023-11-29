import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

/* eslint-disable no-param-reassign */
// no-param-reassign is disabled in this method since it uses immer
export const themeSlice = createSlice({
  name: "filter",
  // createSlice will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});
/* eslint-enable no-param-reassign */

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
