import Destination from "../models/Destination.js";
import FilterState from "../../../shared/types/FilterState";

const resolvers = {
  Query: {
    getCountries: async () => {
      // Use Mongoose to fetch all countries from MongoDB
      try {
        const destinations = await Destination.find();
        const countries = destinations.map(
          (destination) => destination.Country,
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
    getFilteredDestinations: async (
      _: any,
      {
        Country,
        filter,
        after,
        first = 9,
      }: {
        Country: string;
        filter: FilterState;
        after: string;
        first?: number;
      },
    ) => {
      try {
        // Initialize the query with the Country and dynamic keys like 'Resort'.
        const query: any = { Country };
        // Initialize the sort object
        const sort: any = {};

        // If an 'after' cursor is provided, add the 'Resort' property to the query.
        if (after) {
          query.Resort = { $gt: after };
        }

        // Initialize the aggregate pipeline with a match stage
        const aggregatePipeline: any[] = [{ $match: query }];

        // Apply the filters from the 'filter' object to the query.
        if (filter) {
          if (filter.hasPark) query.Snowparks = filter.hasPark;
          if (filter.hasNightSkiing) query.NightSki = filter.hasNightSkiing;
          if (filter.hasChairlift) query.ChairLifts = { $gte: 1 };
          if (filter.hasGondola) query.GondolaLifts = { $gte: 1 };
          if (filter.isCertified) query.Certified = filter.isCertified;
          if (filter.minElevationDifference) {
            query.$expr = {
              $gte: [
                { $subtract: ["$HighestPoint", "$LowestPoint"] },
                filter.minElevationDifference,
              ],
            };
          }
          if (filter.minBaseElevation)
            query.LowestPoint = { $gte: filter.minBaseElevation };
          if (filter.minTotalPiste)
            query.TotalSlope = { $gte: filter.minTotalPiste };
          if (filter.minTotalLifts)
            query.TotalLifts = { $gte: filter.minTotalLifts };
          if (filter.maxDayPassPrice)
            query.DayPassPriceAdult = { $lte: filter.maxDayPassPrice };
        }

        if (filter.sortAZ) sort.Resort = 1; // Ascending order by Resort name
        if (filter.sortZA) sort.Resort = -1; // Descending order by Resort name
        if (filter.sortElevationDifference) {
          // Add a project stage to calculate and add the elevationDifference field
          aggregatePipeline.push({
            $addFields: {
              elevationDifference: {
                $subtract: ["$HighestPoint", "$LowestPoint"],
              },
            },
          });

          // Sort based on the elevation difference field
          sort.elevationDifference = -1;
        }
        if (filter.sortBaseElevation) sort.LowestPoint = -1; // Descending order by LowestPoint
        if (filter.sortTotalPiste) sort.TotalSlope = -1; // Descending order by TotalSlope
        if (filter.sortTotalLifts) sort.TotalLifts = -1; // Descending order by TotalLifts
        if (filter.sortDayPassPrice) sort.DayPassPriceAdult = 1; // Ascending order by DayPassPriceAdult

        // Add a sort stage to the aggregate pipeline
        aggregatePipeline.push({ $sort: sort });

        // Add a limit stage to the aggregate pipeline
        aggregatePipeline.push({ $limit: first });

        // Execute the query with the aggregate pipeline
        const destinations = await Destination.aggregate(aggregatePipeline);

        // Transform the result into the shape expected for pagination.
        const edges = destinations.map((destination) => ({
          node: destination,
          cursor: destination.Resort, // Use Resort name as the cursor
        }));

        // Find out if there is a next page.
        let hasNextPage = false;
        if (destinations.length > 0) {
          const lastDestination = destinations[destinations.length - 1];
          // Count if there are more destinations after the last one we fetched.
          hasNextPage =
            (await Destination.countDocuments({
              ...query,
              Resort: { $gt: lastDestination.Resort },
            })) > 0;
        }

        // Prepare the endCursor from the last destination's Resort if available.
        const endCursor =
          edges.length > 0 ? edges[edges.length - 1].cursor : null;

        // Return in the shape of a paginated response.
        return {
          edges,
          pageInfo: {
            endCursor,
            hasNextPage,
          },
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
