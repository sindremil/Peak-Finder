import { GraphQLClient, gql } from "graphql-request";
import { SearchResult } from "../components/Searchbar/searchbarTypes";
import getGraphQLClient from "./getGraphQLClient";

const client: GraphQLClient = getGraphQLClient();

export default async function getSearchResult(
  searchTerm: string,
  maxResults: number,
): Promise<SearchResult> {
  const query = gql`
    query SearchQuery($searchTerm: String!, $maxResults: Int!) {
      getDestinations(searchTerm: $searchTerm, maxResults: $maxResults) {
        Resort
      }
    }
  `;

  const variables: { searchTerm: string; maxResults: number } = {
    searchTerm,
    maxResults,
  };

  try {
    const data: SearchResult = await client.request(query, variables);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch search result: ${error}`);
  }
}
