export default interface DestinationResponse  {
  getDestination: {
    Resort: string;
    Country: string;
    HighestPoint: number;
    LowestPoint: number;
    DayPassPriceAdult: number;
    BeginnerSlope: number;
    IntermediateSlope: number;
    DifficultSlope: number;
    TotalSlope: number;
    Snowparks: boolean;
    NightSki: boolean;
    SurfaceLifts: number;
    ChairLifts: number;
    GondolaLifts: number;
    TotalLifts: number;
    TotalRating: number;
    AmountOfRatings: number;
    Certifed: boolean;
  };
}
