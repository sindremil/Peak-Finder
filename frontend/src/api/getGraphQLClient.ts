import { GraphQLClient } from "graphql-request";
import { backendEndpoint } from "../config";

let clientInstance: GraphQLClient | null = null;

// Singleton pattern used to avoid multiple clients
export default function getGraphQLClient(): GraphQLClient {
  if (clientInstance === null) {
    clientInstance = new GraphQLClient(backendEndpoint);
  }

  return clientInstance;
}
