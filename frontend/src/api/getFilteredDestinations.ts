import { GraphQLClient, gql } from "graphql-request";
import getGraphQLClient from "./getGraphQLClient";
import DestinationCardResponse from "../interfaces/DestinationCardResponse";

const client: GraphQLClient = getGraphQLClient();

export default async function getFilteredDestinations(
  country: string,
  after: string | unknown,
  first: number = 9,
): Promise<DestinationCardResponse> {
  const query = gql`
    query getFilteredDestinations(
      $country: String!
      $after: String!
      $first: Int
    ) {
      getFilteredDestinations(Country: $country, after: $after, first: $first) {
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

  const variables: { country: string; after: string | unknown; first: number } =
    {
      country,
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
