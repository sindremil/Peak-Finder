import DestinationCardProps from "../interfaces/DestinationCardProps";

// Data returned by Mock Service Worker for the GetDestination query
export const hemsedalPage = {
  data: {
    getDestination: {
      AmountOfRatings: 1,
      BeginnerSlope: 29,
      Certified: true,
      ChairLifts: 5,
      Country: "Norge",
      DayPassPriceAdult: 46,
      DifficultSlope: 4,
      ElevationDifference: 830,
      GondolaLifts: 0,
      HighestPoint: 1450,
      IntermediateSlope: 10,
      LowestPoint: 620,
      NightSki: true,
      Resort: "Hemsedal",
      Snowparks: true,
      SurfaceLifts: 16,
      TotalLifts: 21,
      TotalRating: 5,
      TotalSlope: 44,
    },
  },
};

// Data returned by Mock Service Worker for the giveRating mutation
export const hemsedalAfterRating = {
  data: {
    giveRating: {
      AmountOfRatings: 2,
      TotalRating: 6,
    },
  },
};

// DestinationCardProps for Hemsedal used in the DestinationCard test
export const hemsedalCard: DestinationCardProps = {
  name: "Hemsedal",
  highestPoint: 1450,
  lowestPoint: 620,
  elevationDifference: 830,
  beginner: 20,
  intermediate: 60,
  advanced: 20,
  lifts: 20,
  imageSrc: "../../public/images/resorts/hemsedal.jpg",
  imageAlt: "Bilde av Hemsedal",
};
