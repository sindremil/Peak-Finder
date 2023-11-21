import { describe, it } from "vitest";
import { screen, render, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";

function renderNavbar() {
  render(
    <Router>
      <Navbar />
    </Router>,
  );
}

describe("Navbar", async () => {
  it("Logo should be visible", async () => {
    renderNavbar();
    const logo = await screen.findByRole("img", { name: "Peak Finder logo" });
    expect(logo).toBeVisible();
  });

  it("Search icon should be visible", async () => {
    renderNavbar();
    const searchIcon = await screen.findByTestId("searchIcon");
    expect(searchIcon).toBeVisible();
  });

  it("Logo should be cropped when window width is less than 600px", async () => {
    renderNavbar();
    const logo = await screen.findByRole("img", { name: "Peak Finder logo" });

    // Check inital src of logo
    expect(logo).toHaveAttribute(
      "src",
      "/project2/src/assets/logos/logo-no-background.svg",
    );

    // Set the inner width and height properties of the window
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 599,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 600,
    });

    // Trigger a window resize event
    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    // Check if logo has changed as expected
    await waitFor(() =>
      expect(logo).toHaveAttribute(
        "src",
        "/project2/src/assets/logos/logo-no-background-cropped.svg",
      ),
    );
  });

  it("Navbar snapshot", () => {
    renderNavbar();
    expect(screen).toMatchSnapshot();
  });
});
