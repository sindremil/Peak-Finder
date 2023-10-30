// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Destination" type defines the queryable fields for every destination in our data source.
  type Destination {
    Resort: String
    Country: String
    HighestPoint: Int
    LowestPoint: Int
    DayPricePassAdult: Int
    BeginnerSlope: Int
    IntermediateSlope: Int
    DifficultSlope: Int
    TotalSlope: Int
    Snowparks: Boolean
    NightSki: Boolean
    SurfaceLifts: Int
    ChairLifts: Int
    GondolaLifts: Int
    TotalLifts: Int
    LiftCapacity: Int
    Snowcanons: Int
    AverageRating: Float
    TotalRatings: Int
    Certified: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "destination" query returns an array of zero or more Destinations (defined above).
  type Query {
    getDestination(Resort: String!): Destination
    getDestinations(limit: Int!): [Destination]
  }
`;

export default typeDefs;
