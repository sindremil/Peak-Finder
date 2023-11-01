import Destination from "../models/Destination.js";

const resolvers = {
  Query: {
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
      { searchTerm, maxResults }: { searchTerm: string; maxResults: number },
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
      { Country, maxResults }: { Country: string; maxResults: number },
    ) => {
      // Use Mongoose to fetch data from MongoDB and filter by country
      try {
        const destinations = await Destination.find({ Country }).limit(
          maxResults,
        );
        return destinations;
      } catch (error) {
        console.log("Error fetching destinations by country:", error);
        return null;
      }
    },
  },
  Mutation: {
    giveRating: async (
      _: any,
      { Resort, Rating }: { Resort: string; Rating: number },
    ) => {
      // Use Mongoose to fetch data from MongoDB and filter by resort
      try {
        const destination = await Destination.findOneAndUpdate(
          { Resort },
          { $inc: { TotalRating: Rating, AmountOfRatings: 1 } },
          { new: true },
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
