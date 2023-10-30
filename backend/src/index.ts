import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from "@apollo/server/standalone"
import mongoose from 'mongoose';
import resolvers from './graphql/resolvers.js';
import typeDefs from './graphql/typeDefs.js';

const MONGODB = "mongodb://peakfinder:peakfinder@it2810-42.idi.ntnu.no:27017/PeakFinder";

// Apollo Server
// typeDefs GraphQL Type Definitions
// Resolvers: How do we resolve queries

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Connect to MongoDB
mongoose
  .connect(MONGODB)
  .then(() => {
    console.log('MongoDB Connected');
  });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);