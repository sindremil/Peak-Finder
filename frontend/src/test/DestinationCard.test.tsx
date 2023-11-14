import { describe, it } from "vitest";
import { screen } from "@testing-library/react";
import DestinationCard from "../components/DestinationCard";
import renderWithProviders from "../utils/testUtils";
import { hemsedalCard } from "../mocks/mockData";

describe("DestinationCard", () => {
  it("Image should be visible", () => {
    // Render component with mock data and necessary providers
    // This mock data is not from MSW, but comes directly from mockData.ts
    renderWithProviders(
      true,
      <DestinationCard destinationCardProps={hemsedalCard} />,
    );
    const destinationImage = screen.getByRole("img", {
      name: `Bilde av ${hemsedalCard.name}`,
    });

    // Expect image to be visible
    expect(destinationImage).toBeVisible();
  });
});
