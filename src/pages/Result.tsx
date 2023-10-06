import DestinationCard from "../components/DestinationCard";
import DestinationCardProps from "../interfaces/DestinationCardProps";
import hemsedalImage from "../assets/hemsedal.jpg";

export default function Result(): JSX.Element {
  // Mock values
  const mockDestinationCardProps: DestinationCardProps = {
    name: "Hemsedal",
    imageSrc: hemsedalImage,
    imageAlt: "Mock Image Alt",
    lowestPoint: 1030,
    highestPoint: 2479,
    beginner: 30,
    intermediate: 60,
    advanced: 10,
    lifts: 15,
  };
  return <DestinationCard destinationCardProps={mockDestinationCardProps} />;
}
