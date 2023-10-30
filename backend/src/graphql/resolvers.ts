import Destination from "../models/Destination.js";

const resolvers = {
  Query: {
    getDestination: async (_, {Resort}) => {
      // Use Mongoose to fetch data from MongoDB
      try {
        const destination = await Destination.findOne({Resort});
        if (!destination) {
          console.log(`No destination found for resort: ${Resort}`);
        }
        return destination;
      } catch (error) {
        console.log('Error fetching destination:', error);
        return null;
      }
    },
    getDestinations: async (_, {limit}) => {
      return await Destination.find().limit(limit);
    }
  },
};

export default resolvers;
