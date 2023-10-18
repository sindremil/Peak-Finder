import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  hasPark: boolean;
  hasNightSkiing: boolean;
  hasChairlift: boolean;
  hasGondola: boolean;
  isCertified: boolean;
}

const initialState: FilterState = {
  hasPark: false,
  hasNightSkiing: false,
  hasChairlift: false,
  hasGondola: false,
  isCertified: false,
};

export const filterSlice = createSlice({
  name: "filter",
  // createSlice will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleHasPark: (state) => {
      state.hasPark = !state.hasPark;
    },
    toggleHasNightSkiing: (state) => {
      state.hasNightSkiing = !state.hasNightSkiing;
    },
    toggleHasChairlift: (state) => {
      state.hasChairlift = !state.hasChairlift;
    },
    toggleHasGondola: (state) => {
      state.hasGondola = !state.hasGondola;
    },
    toggleIsCertified: (state) => {
      state.isCertified = !state.isCertified;
    },
  },
});

export const {
  toggleHasPark,
  toggleHasNightSkiing,
  toggleHasChairlift,
  toggleHasGondola,
  toggleIsCertified,
} = filterSlice.actions;

export default filterSlice.reducer;
