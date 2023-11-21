export const getDestinationQuery = `
  query Query($resort: String!) {
    getDestination(Resort: $resort) {
      Resort
      Country
      LowestPoint
      HighestPoint
      DayPassPriceAdult
      BeginnerSlope
      IntermediateSlope
      DifficultSlope
      TotalSlope
      Snowparks
      NightSki
      SurfaceLifts
      ChairLifts
      GondolaLifts
      TotalLifts
      TotalRating
      AmountOfRatings
      Certified
    }
  }
`;

export const giveRating = `
  mutation Mutation($resort: String!, $rating: Int!) {
    giveRating(Resort: $resort, Rating: $rating) {
      Resort
      TotalRating
      AmountOfRatings
    }
  }
`;

export const searchQuery = `
  query Query($searchTerm: String!, $maxResults: Int!) {
    getDestinations(searchTerm: $searchTerm, maxResults: $maxResults) {
      Resort
    }
  }
`;