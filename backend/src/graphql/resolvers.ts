import Destination from "../models/Destination.js";
import FilterState from "../../../shared/types/FilterState";
import DestinationInterface from "../../../shared/types/Destination";

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
      // Sanitize searchTerm to allow only letters, "/", "(", ")", and "-"
      const sanitizedSearchTerm = searchTerm.replace(/[^/()\-\p{L}]/gu, "");

      // Use Mongoose to fetch data from MongoDB and filter by sanitized searchTerm
      try {
        const destinations = await Destination.find({
          Resort: { $regex: sanitizedSearchTerm, $options: "i" },
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
        after?: DestinationInterface;
        first?: number;
      },
    ) => {
      try {
        // Initialize the query with the Country and dynamic keys like 'Resort'.
        const query: any = { Country };
        // Initialize the sort object
        const sort: any = {};

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
            query.ElevationDifference = {
              $gte: filter.minElevationDifference,
            };
          }
          if (filter.minBaseElevation) {
            query.LowestPoint = { $gte: filter.minBaseElevation };
          }
          if (filter.minTotalPiste)
            query.TotalSlope = { $gte: filter.minTotalPiste };
          if (filter.minTotalLifts)
            query.TotalLifts = { $gte: filter.minTotalLifts };
          if (filter.maxDayPassPrice)
            query.DayPassPriceAdult = { $lte: filter.maxDayPassPrice };
        }

        // Apply the custom sorting logic
        let sortByField = "Resort";
        let sortAsc = true;

        if (filter.sortType === "ZA") {
          sort.Resort = -1; // Descending order by Resort name
          sortAsc = false;
          if (after) {
            query.Resort = { $lt: after.Resort };
          }
        } else if (filter.sortType === "elevationDifference") {
          // Sort based on the elevation difference field
          sort.ElevationDifference = -1;
          sortByField = "ElevationDifference";
          sortAsc = false;
          if (after) {
            query.$or = [
              { ElevationDifference: { $lt: after.ElevationDifference } },
              {
                $and: [
                  { ElevationDifference: after.ElevationDifference },
                  { id: { $gt: after.id } },
                ],
              },
            ];
          }
        } else if (filter.sortType === "baseElevation") {
          sort.LowestPoint = -1; // Descending order by LowestPoint
          sortByField = "LowestPoint";
          sortAsc = false;
          if (after) {
            query.$or = [
              { LowestPoint: { $lt: after.LowestPoint } },
              {
                $and: [
                  { LowestPoint: after.LowestPoint },
                  { id: { $gt: after.id } },
                ],
              },
            ];
          }
        } else if (filter.sortType === "totalPiste") {
          sort.TotalSlope = -1; // Descending order by TotalSlope
          sortByField = "TotalSlope";
          sortAsc = false;
          if (after) {
            query.$or = [
              { TotalSlope: { $lt: after.TotalSlope } },
              {
                $and: [
                  { TotalSlope: after.TotalSlope },
                  { id: { $gt: after.id } },
                ],
              },
            ];
          }
        } else if (filter.sortType === "totalLifts") {
          sort.TotalLifts = -1; // Descending order by TotalLifts
          sortByField = "TotalLifts";
          sortAsc = false;
          if (after) {
            query.$or = [
              { TotalLifts: { $lt: after.TotalLifts } },
              {
                $and: [
                  { TotalLifts: after.TotalLifts },
                  { id: { $gt: after.id } },
                ],
              },
            ];
          }
        } else if (filter.sortType === "dayPassPrice") {
          sort.DayPassPriceAdult = 1; // Ascending order by DayPassPriceAdult
          sortByField = "DayPassPriceAdult";
          if (after) {
            query.$or = [
              { DayPassPriceAdult: { $gt: after.DayPassPriceAdult } },
              {
                $and: [
                  { DayPassPriceAdult: after.DayPassPriceAdult },
                  { id: { $gt: after.id } },
                ],
              },
            ];
          }
        } // If the sortType is not recognized, it defaults to "AZ"
        else {
          sort.Resort = 1; // Ascending order by Resort name
          if (after) {
            query.Resort = { $gt: after.Resort };
          }
        }

        sort.id = 1; // Ascending order by id

        // Add a sort stage to the aggregate pipeline
        aggregatePipeline.push({ $sort: sort });

        // Add a limit stage to the aggregate pipeline
        aggregatePipeline.push({ $limit: first });

        // Execute the query with the aggregate pipeline
        const destinations = await Destination.aggregate(aggregatePipeline);

        // Transform the result into the shape expected for pagination.
        const edges = destinations.map((destination) => ({
          node: destination,
        }));

        // Find out if there is a next page.
        let hasNextPage = false;
        if (destinations.length > 0) {
          const lastDestination = destinations[destinations.length - 1];

          // Create a dynamic field query based on sortByField
          const nextPageQuery = { ...query };

          const comparisonOperator = sortAsc ? "$gte" : "$lte";

          nextPageQuery.$or = [
            {
              [sortByField]: {
                [comparisonOperator]: lastDestination[sortByField],
              },
            },
            {
              $and: [{ id: { $gt: lastDestination.id } }],
            },
          ];

          // Count if there are more destinations after the last one we fetched.
          const nextPageDocuments =
            await Destination.countDocuments(nextPageQuery);
          hasNextPage = nextPageDocuments > 0;
        }

        // Prepare the endCursor from the last destination's Resort if available.
        const endCursor =
          edges.length > 0 ? edges[edges.length - 1].node : null;

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
