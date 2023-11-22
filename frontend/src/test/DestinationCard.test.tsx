import { describe, it } from "vitest";
import { screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { hemsedalCard } from "../mocks/mockData";

describe("DestinationCard", () => {
  // Render component with mock data and BrowserRouter
  // This mock data is not from MSW, but comes directly from mockData.ts
  beforeEach(() => {
    render(
      <Router>
        <DestinationCard destinationCardProps={hemsedalCard} />
      </Router>,
    );
  });

  it("Title should be visible and display correct text", () => {
    // Get title by text
    const destinationTitle = screen.getByText(hemsedalCard.name);

    // Expect title to be visible and have correct text
    expect(destinationTitle).toBeVisible();
    expect(destinationTitle).toHaveTextContent("Hemsedal");
  });

  it("Image should be visible", () => {
    // Get image by role and alt text
    const destinationImage = screen.getByRole("img", {
      name: `Bilde av ${hemsedalCard.name}`,
    });

    // Expect image to be visible
    expect(destinationImage).toBeVisible();
  });

  it("DestinationCard snapshot", () => {
    expect(screen).toMatchSnapshot();
  });
});
