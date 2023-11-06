import { GraphQLClient, gql } from "graphql-request";
import getGraphQLClient from "./getGraphQLClient";
import CountriesResponse from "../interfaces/CountriesResponse";

const client: GraphQLClient = getGraphQLClient();

export default async function getCountries(): Promise<CountriesResponse> {
  const query = gql`
    query countries {
      getCountries
    }
  `;

  try {
    const data: CountriesResponse = await client.request(query);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch countries: ${error}`);
  }
}
