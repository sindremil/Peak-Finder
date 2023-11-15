import { describe, it } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithReduxProviders from "../utils/testUtils";
import Destination from "../components/Destination/Destination";
import getDestinationPageProps from "../api/getDestinationPageProps";
import DestinationInterface from "../interfaces/Destination";

describe("Destination", async () => {
  // Function to get destination data from Mock Service Worker
  async function mockDestinationProps(): Promise<DestinationInterface> {
    const destinationResponse = await getDestinationPageProps("Hemsedal");
    return destinationResponse.getDestination;
  }

  it("Title should be visible and display correct text", async () => {
    const destination: DestinationInterface = await mockDestinationProps();

    // Render component with mock data and necessary providers
    renderWithReduxProviders(<Destination destination={destination} />);
    const destinationTitle = screen.getByText(destination.Resort);

    // Expect title to be visible and display correct text
    expect(destinationTitle).toBeVisible();
    expect(destinationTitle).toHaveTextContent("Hemsedal");
  });

  it("Destination image should be visible", async () => {
    const destination: DestinationInterface = await mockDestinationProps();

    // Render component with mock data and necessary providers
    renderWithReduxProviders(<Destination destination={destination} />);

    // Get destination image by role and aria-label
    const destinationImage = screen.getByRole("img", {
      name: `Bilde av ${destination.Resort}`,
    });

    // Except image to be visible
    expect(destinationImage).toBeVisible();
  });

  it("Amount of ratings should increase when user gives a rating", async () => {
    const destination: DestinationInterface = await mockDestinationProps();

    // Render component with mock data and necessary providers
    renderWithReduxProviders(<Destination destination={destination} />);

    // Get amount of ratings and button
    const amountOfRatings = screen.getByText(
      `(${destination.AmountOfRatings})`,
    );
    const button = screen.getByRole("button");

    // Check initial value of amount of ratings from mocked data
    expect(amountOfRatings).toHaveTextContent("(1)");

    // Click button to get rating popup
    fireEvent.click(button);

    // Get and click star and submit button
    const star = screen.getByLabelText("1 Star");
    const submit = screen.getByText("Send inn");
    fireEvent.click(star);
    fireEvent.click(submit);

    // Wait for mutation to finish then check if amount of ratings has increased
    await waitFor(() => expect(amountOfRatings).toHaveTextContent("(2)"));
  });
});
