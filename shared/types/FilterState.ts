export default interface FilterState {
  hasPark: boolean;
  hasNightSkiing: boolean;
  hasChairlift: boolean;
  hasGondola: boolean;
  isCertified: boolean;

  minElevationDifference: number;
  minBaseElevation: number;
  minTotalPiste: number;
  minTotalLifts: number;
  maxDayPassPrice: number;

  sortAZ: boolean;
  sortZA: boolean;
  sortElevationDifference: boolean;
  sortBaseElevation: boolean;
  sortTotalPiste: boolean;
  sortTotalLifts: boolean;
  sortDayPassPrice: boolean;
}