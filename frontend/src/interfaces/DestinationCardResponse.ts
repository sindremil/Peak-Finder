import DestinationCard from "./DestinationCard";

export default interface DestinationCardResponse {
  getFilteredDestinations: {
    edges: {
      cursor: string;
      node: DestinationCard;
    }[];
    pageInfo: {
      endCursor: string;
      hasNextPage: boolean;
    };
  };
}
