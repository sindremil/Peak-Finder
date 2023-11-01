import { GraphQLClient } from "graphql-request";
import { SearchResult } from "./searchbarTypes";

const endpoint = "http://localhost:4000/";
const client = new GraphQLClient(endpoint);

export default async function fetchSearchResult(
  searchTerm: string,
  maxResults: number,
): Promise<SearchResult> {
  const query = `
  query SearchQuery($searchTerm: String!, $maxResults: Int!) {
    getDestinations(searchTerm: $searchTerm, maxResults: $maxResults) {
      Resort
    }
  }
  `;

  const variables = {
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
