import { GraphQLClient, gql } from "graphql-request";
import getGraphQLClient from "./getGraphQLClient";
import DestinationCardResponse from "../interfaces/DestinationCardResponse";
import FilterState from "../../../shared/types/FilterState";

const client: GraphQLClient = getGraphQLClient();

export default async function getFilteredDestinations(
  country: string,
  filter: FilterState,
  after: string | unknown,
  first: number = 9
): Promise<DestinationCardResponse> {
  const query = gql`
    query getFilteredDestinations(
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
      }
    }
  `;

  const variables: {
    country: string;
    filter: FilterState;
    after: string | unknown;
    first: number;
  } = {
    country,
    filter,
    after,
    first,
  };

  try {
    console.log(variables)
    const data: DestinationCardResponse = await client.request(
      query,
      variables
    );
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch filtered destinations: ${error}`);
  }
}
