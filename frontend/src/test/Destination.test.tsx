import { describe, it } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithReduxProviders from "../utils/testUtils";
import Destination from "../components/Destination/Destination";
import getDestinationPageProps from "../api/getDestinationPageProps";

describe("Destination", async () => {
  beforeEach(async () => {
    // Get destination page props from Mock Service Worker and render component
    const destination = (await getDestinationPageProps("Hemsedal"))
      .getDestination;
    renderWithReduxProviders(<Destination destination={destination} />);
  });

  it("Title should be visible and display correct text", async () => {
    const destinationTitle = screen.getByText("Hemsedal");

    // Expect title to be visible and display correct text
    expect(destinationTitle).toBeVisible();
  });

  it("Destination image should be visible", async () => {
    // Get destination image by role and aria-label
    const destinationImage = screen.getByRole("img", {
      name: "Bilde av Hemsedal",
    });

    // Except image to be visible
    expect(destinationImage).toBeVisible();
  });

  it("Amount of ratings should increase when user gives a rating", async () => {
    // Get amount of ratings and button
    const amountOfRatings = screen.getByText("(1)");

    const button = screen.getByRole("button");

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

  it("Destination snapshot", async () => {
    expect(screen).toMatchSnapshot();
  });
});
