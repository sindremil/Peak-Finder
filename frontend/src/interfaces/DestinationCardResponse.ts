import DestinationCard from "./DestinationCard";

export default interface DestinationCardResponse {
  getFilteredDestinations: {
    edges: {
      cursor: string;
      node: DestinationCard;
    }[]
  };
}
