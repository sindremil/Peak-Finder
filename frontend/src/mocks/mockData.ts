import DestinationCardProps from "../interfaces/DestinationCardProps";

// Data returned by Mock Service Worker for the GetDestination query
export const hemsedalPage = {
  data: {
    getDestination: {
      AmountOfRatings: 1,
      BeginnerSlope: 29,
      Certified: true,
      ChairLifts: 6,
      Country: "Norway",
      DayPassPriceAdult: 46,
      DifficultSlope: 4,
      GondolaLifts: 0,
      HighestPoint: 1450,
      IntermediateSlope: 10,
      LowestPoint: 620,
      NightSki: true,
      Resort: "Hemsedal",
      Snowparks: true,
      SurfaceLifts: 15,
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
  country: "Norge",
  imageSrc: "../../public/images/resorts/hemsedal.jpg",
  imageAlt: "Bilde av Hemsedal",
  lowestPoint: 620,
  highestPoint: 1450,
  beginner: 20,
  intermediate: 60,
  advanced: 20,
  lifts: 20,
};
