import { GraphQLClient, gql } from "graphql-request";
import DestinationResponse from "../interfaces/DestinationResponse";
import getGraphQLClient from "./getGraphQLClient";

const client: GraphQLClient = getGraphQLClient();

export default async function getDestinationPageProps(
  resort: string,
): Promise<DestinationResponse> {
  const query = gql`
    query GetDestination($resort: String!) {
      getDestination(Resort: $resort) {
        Resort
        Country
        HighestPoint
        LowestPoint
        DayPassPriceAdult
        BeginnerSlope
        DifficultSlope
        IntermediateSlope
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

  const variables: { resort: string } = {
    resort,
  };

  try {
    const data: DestinationResponse = await client.request(query, variables);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch destination: ${error}`);
  }
}
