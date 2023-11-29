import { GraphQLClient, gql } from "graphql-request";
import getGraphQLClient from "./getGraphQLClient";
import DestinationCardResponse from "../interfaces/DestinationCardResponse";
import FilterState from "../../../shared/types/FilterState";
import Destination from "../../../shared/types/Destination";

const client: GraphQLClient = getGraphQLClient();

export default async function getFilteredDestinations(
  country: string,
  filter: FilterState,
  after: Destination | unknown = null,
  first: number = 9,
): Promise<DestinationCardResponse> {
  const query = gql`
    query getFilteredDestinations(
      $country: String!
      $filter: FilterState!
      $after: DestinationInput
      $first: Int
    ) {
      getFilteredDestinations(
        Country: $country
        filter: $filter
        after: $after
        first: $first
      ) {
        edges {
          node {
            Resort
            Country
            HighestPoint
            LowestPoint
            ElevationDifference
            BeginnerSlope
            IntermediateSlope
            DifficultSlope
            TotalLifts
          }
        }
        pageInfo {
          endCursor {
            Resort
            Country
            HighestPoint
            LowestPoint
            ElevationDifference
            BeginnerSlope
            IntermediateSlope
            DifficultSlope
            TotalLifts
          }
          hasNextPage
        }
      }
    }
  `;

  const variables: {
    country: string;
    filter: FilterState;
    after: Destination | unknown;
    first: number;
  } = {
    country,
    filter,
    after,
    first,
  };

  try {
    const data: DestinationCardResponse = await client.request(
      query,
      variables,
    );
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch filtered destinations: ${error}`);
  }
}
