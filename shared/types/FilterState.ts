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

  sortType: string;
}