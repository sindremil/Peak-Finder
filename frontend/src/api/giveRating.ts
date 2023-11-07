import { GraphQLClient, gql } from "graphql-request";
import getGraphQLClient from "./getGraphQLClient";
import RatingResponse from "../interfaces/RatingResponse";

const client: GraphQLClient = getGraphQLClient();

export default async function giveReview({
  resort,
  rating,
}: {
  resort: string;
  rating: number;
}): Promise<RatingResponse> {
  const mutation = gql`
    mutation giveRating($resort: String!, $rating: Int!) {
      giveRating(Resort: $resort, Rating: $rating) {
        TotalRating
        AmountOfRatings
      }
    }
  `;

  const variables: { resort: string; rating: number } = {
    resort,
    rating,
  };

  try {
    const data: RatingResponse = await client.request(mutation, variables);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch destination: ${error}`);
  }
}
