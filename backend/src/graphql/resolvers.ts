import Destination from "../models/Destination.js";

const resolvers = {
  Query: {
    getCountries: async (_: any) => {
      // Use Mongoose to fetch all countries from MongoDB
      try {
        const destinations = await Destination.find();
        const countries = destinations.map(
          (destination) => destination.Country
        );
        const uniqueCountries = [...new Set(countries)];
        return uniqueCountries;
      } catch (error) {
        console.log("Error fetching countries:", error);
        return null;
      }
    },
    getDestination: async (_: any, { Resort }: { Resort: string }) => {
      // Use Mongoose to fetch data from MongoDB and filter by resort
      try {
        const destination = await Destination.findOne({ Resort });
        if (!destination) {
          console.log(`No destination found for resort: ${Resort}`);
        }
        return destination;
      } catch (error) {
        console.log("Error fetching destination:", error);
        return null;
      }
    },
    getDestinations: async (
      _: any,
      { searchTerm, maxResults }: { searchTerm: string; maxResults: number }
    ) => {
      // Use Mongoose to fetch data from MongoDB and filter by searchTerm
      try {
        const destinations = await Destination.find({
          Resort: { $regex: searchTerm, $options: "i" },
        }).limit(maxResults);
        return destinations;
      } catch (error) {
        console.log("Error fetching destinations:", error);
        return null;
      }
    },
    getDestinationsByCountry: async (
      _: any,
      { Country, maxResults }: { Country: string; maxResults: number }
    ) => {
      // Use Mongoose to fetch data from MongoDB and filter by country
      try {
        const destinations = await Destination.find({ Country }).limit(
          maxResults
        );
        return destinations;
      } catch (error) {
        console.log("Error fetching destinations by country:", error);
        return null;
      }
    },
    getFilteredDestinations: async (
      _: any,
      { Country, after, first = 9 }: { Country: string; after?: string; first?: number }
    ) => {
      try {
        // Initialize the query with any shape to accept dynamic keys like 'Resort'.
        let query: any = { Country: Country };
    
        // If an 'after' cursor is provided, add the 'Resort' property to the query.
        if (after) {
          query['Resort'] = { $gt: after };
        }
    
        // Execute the query with sorting and limiting to implement pagination.
        const destinations = await Destination.find(query)
          .sort({ Resort: 1 }) // Sort by the Resort field
          .limit(first);
    
        // Transform the result into the shape expected for pagination.
        const edges = destinations.map(destination => ({
          node: destination,
          cursor: destination.Resort, // Use Resort name as the cursor
        }));
    
        // Find out if there is a next page.
        let hasNextPage = false;
        if (destinations.length > 0) {
          const lastDestination = destinations[destinations.length - 1];
          // Count if there are more destinations after the last one we fetched.
          hasNextPage = await Destination.countDocuments({
            Country: Country,
            Resort: { $gt: lastDestination.Resort }
          }) > 0;
        }
    
        // Prepare the endCursor from the last destination's Resort if available.
        const endCursor = edges.length > 0 ? edges[edges.length - 1].cursor : null;
    
        // Return in the shape of a paginated response.
        return {
          edges: edges,
          pageInfo: {
            endCursor: endCursor,
            hasNextPage: hasNextPage
          }
        };
      } catch (error) {
        console.error("Error fetching filtered destinations:", error);
        return null;
      }
    },    
  },
  Mutation: {
    giveRating: async (
      _: any,
      { Resort, Rating }: { Resort: string; Rating: number }
    ) => {
      // Use Mongoose to fetch data from MongoDB and filter by resort
      try {
        const destination = await Destination.findOneAndUpdate(
          { Resort },
          { $inc: { TotalRating: Rating, AmountOfRatings: 1 } },
          { new: true }
        );
        if (!destination) {
          console.log(`No destination found for resort: ${Resort}`);
        }
        return destination;
      } catch (error) {
        console.log("Error fetching destination:", error);
        return null;
      }
    },
  },
};

export default resolvers;
