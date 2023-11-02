import { GraphQLClient } from 'graphql-request';
import { backendEndpoint } from '../config'; // Import your configuration or use your configuration values directly here

const client = new GraphQLClient(backendEndpoint);

export function useGqlClient() {
  return client;
}
