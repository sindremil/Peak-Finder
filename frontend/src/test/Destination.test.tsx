import { describe, it } from "vitest";
import { screen } from "@testing-library/react";
import renderWithProviders from "../utils/testUtils";
import Destination from "../components/Destination/Destination";
import getDestinationPageProps from "../api/getDestinationPageProps";
import DestinationInterface from "../interfaces/Destination";

describe("Destination", async () => {
  it("Destination image should be visible", async () => {
    // Get destination data from Mock Service Worker
    const destinationResponse = await getDestinationPageProps("Hemsedal");
    const destination: DestinationInterface =
      destinationResponse.getDestination;

    // Render component with mock data and necessary providers
    renderWithProviders(false, <Destination destination={destination} />);
    const destinationImage = screen.getByRole("img", {
      name: `Bilde av ${destination.Resort}`,
    });

    // Except image to be visible
    expect(destinationImage).toBeVisible();
  });
});
