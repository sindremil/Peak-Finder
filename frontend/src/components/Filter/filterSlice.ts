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

  sortAZ: true,
  sortZA: false,
  sortElevationDifference: false,
  sortBaseElevation: false,
  sortTotalPiste: false,
  sortTotalLifts: false,
  sortDayPassPrice: false,
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
    toggleSortAZ: (state, action) => {
      state.sortAZ = action.payload;
    },
    toggleSortZA: (state, action) => {
      state.sortZA = action.payload;
    },
    toggleSortElevationDifference: (state, action) => {
      state.sortElevationDifference = action.payload;
    },
    toggleSortBaseElevation: (state, action) => {
      state.sortBaseElevation = action.payload;
    },
    toggleSortTotalPiste: (state, action) => {
      state.sortTotalPiste = action.payload;
    },
    toggleSortTotalLifts: (state, action) => {
      state.sortTotalLifts = action.payload;
    },
    toggleSortDayPassPrice: (state, action) => {
      state.sortDayPassPrice = action.payload;
    },
    resetSort: (state) => {
      state.sortAZ = false;
      state.sortZA = false;
      state.sortElevationDifference = false;
      state.sortBaseElevation = false;
      state.sortTotalPiste = false;
      state.sortTotalLifts = false;
      state.sortDayPassPrice = false;
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
      state.sortAZ = true;
      state.sortZA = false;
      state.sortElevationDifference = false;
      state.sortBaseElevation = false;
      state.sortTotalPiste = false;
      state.sortTotalLifts = false;
      state.sortDayPassPrice = false;
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

  toggleSortAZ,
  toggleSortZA,
  toggleSortElevationDifference,
  toggleSortBaseElevation,
  toggleSortTotalPiste,
  toggleSortTotalLifts,
  toggleSortDayPassPrice,

  resetSort,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
