import Destination from "../../../shared/types/Destination";
import DestinationCard from "./DestinationCard";

export default interface DestinationCardResponse {
  getFilteredDestinations: {
    edges: {
      node: DestinationCard;
    }[];
    pageInfo: {
      endCursor: Destination;
      hasNextPage: boolean;
    };
  };
}
