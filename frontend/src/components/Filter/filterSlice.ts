import { createSlice } from "@reduxjs/toolkit";
import FilterState from "../../../../shared/types/FilterState";

const initialState: FilterState = {
  hasPark: false,
  hasNightSkiing: false,
  hasChairlift: false,
  hasGondola: false,
  isCertified: false,

  minElevationDifference: 0,
  minBaseElevation: 0,
  minTotalPiste: 0,
  minTotalLifts: 0,
  maxDayPassPrice: 200,

  sortType: "AZ",
};

/* eslint-disable no-param-reassign */
// no-param-reassign is disabled in this method since it uses immer
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
    setMinElevationDifference: (state, action) => {
      state.minElevationDifference = action.payload;
    },
    setMinBaseElevation: (state, action) => {
      state.minBaseElevation = action.payload;
    },
    setMinTotalPiste: (state, action) => {
      state.minTotalPiste = action.payload;
    },
    setMinTotalLifts: (state, action) => {
      state.minTotalLifts = action.payload;
    },
    setMaxDayPassPrice: (state, action) => {
      state.maxDayPassPrice = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    resetFilter: (state) => {
      state.hasPark = false;
      state.hasNightSkiing = false;
      state.hasChairlift = false;
      state.hasGondola = false;
      state.isCertified = false;
      state.minElevationDifference = 0;
      state.minBaseElevation = 0;
      state.minTotalPiste = 0;
      state.minTotalLifts = 0;
      state.maxDayPassPrice = 200;
      state.sortType = "AZ";
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  toggleHasPark,
  toggleHasNightSkiing,
  toggleHasChairlift,
  toggleHasGondola,
  toggleIsCertified,

  setMinElevationDifference,
  setMinBaseElevation,
  setMinTotalPiste,
  setMinTotalLifts,
  setMaxDayPassPrice,

  setSortType,

  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
