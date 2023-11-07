import { GraphQLClient, gql } from "graphql-request";
import getGraphQLClient from "./getGraphQLClient";
import DestinationCardResponse from "../interfaces/DestinationCardResponse";

const client: GraphQLClient = getGraphQLClient();

export default async function getDestinationsByCountry(
  country: string,
  maxResults: number,
): Promise<DestinationCardResponse> {
  const query = gql`
    query getDestinationsByCountry($country: String!, $maxResults: Int!) {
      getDestinationsByCountry(Country: $country, maxResults: $maxResults) {
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
  `;

  const variables: { country: string; maxResults: number } = {
    country,
    maxResults,
  };

  try {
    const data: DestinationCardResponse = await client.request(
      query,
      variables,
    );
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch search result: ${error}`);
  }
}
