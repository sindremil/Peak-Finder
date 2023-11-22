import { gql } from "graphql-request";

export const getDestinationQuery = gql`
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

export const giveRating = gql`
  mutation Mutation($resort: String!, $rating: Int!) {
    giveRating(Resort: $resort, Rating: $rating) {
      Resort
      TotalRating
      AmountOfRatings
    }
  }
`;

export const searchQuery = gql`
  query Query($searchTerm: String!, $maxResults: Int!) {
    getDestinations(searchTerm: $searchTerm, maxResults: $maxResults) {
      Resort
    }
  }
`;

export const getFilteredDestinations = gql`
  query Query(
    $country: String!
    $filter: FilterState!
    $after: String!
    $first: Int
  ) {
    getFilteredDestinations(
      Country: $country
      filter: $filter
      after: $after
      first: $first
    ) {
      edges {
        cursor
        node {
          Resort
          Country
          HighestPoint
          LowestPoint
          BeginnerSlope
          IntermediateSlope
          DifficultSlope
          TotalLifts
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
