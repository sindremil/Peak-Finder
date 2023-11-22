import { describe, expect, it } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithReduxProviders from "./testUtils";
import Filter from "../features/Filter/Filter";

describe("Filter", () => {
  beforeEach(() => {
    renderWithReduxProviders(<Filter />);
  });

  it("Values in input fields should update when sliders are used", async () => {
    // Get all sliders and input fields
    const inputs = document.getElementsByTagName("input");
    const minElevationDifferenceSlider = inputs[0];
    const minElevationDifferenceInput = inputs[1];
    const minBaseElevationSlider = inputs[2];
    const minBaseElevationInput = inputs[3];
    const minTotalPisteSlider = inputs[4];
    const minTotalPisteInput = inputs[5];
    const minTotalLiftsSlider = inputs[6];
    const minTotalLiftsInput = inputs[7];
    const maxDayPassPriceSlider = inputs[8];
    const maxDayPassPriceInput = inputs[9];

    // Change the value on all sliders
    fireEvent.change(minElevationDifferenceSlider, { target: { value: 1500 } });
    fireEvent.change(minBaseElevationSlider, { target: { value: 1500 } });
    fireEvent.change(minTotalPisteSlider, { target: { value: 300 } });
    fireEvent.change(minTotalLiftsSlider, { target: { value: 100 } });
    fireEvent.change(maxDayPassPriceSlider, { target: { value: 100 } });

    // Check that all values in input fields updated as expected
    await waitFor(() => {
      expect(minElevationDifferenceInput.value).toBe("1500");
      expect(minBaseElevationInput.value).toBe("1500");
      expect(minTotalPisteInput.value).toBe("300");
      expect(minTotalLiftsInput.value).toBe("100");
      expect(maxDayPassPriceInput.value).toBe("100");
    });

    // Check that manual input also works as expected
    fireEvent.change(minElevationDifferenceInput, { target: { value: 1000 } });
    await waitFor(() => {
      expect(minElevationDifferenceSlider.value).toBe("1000");
    });
  });

  it("Color of chips should change when clicked", async () => {
    // Get all chips
    const parkChip = screen.getByText("Park");
    const nightSkiingChip = screen.getByText("Kveldskjøring");
    const chairLiftChip = screen.getByText("Stolheis");
    const gondolaChip = screen.getByText("Gondol");
    const certifiedChip = screen.getByText("Peak Finder Sertifisert");

    const chips = [
      parkChip,
      nightSkiingChip,
      chairLiftChip,
      gondolaChip,
      certifiedChip,
    ];

    // MUI symbolized checked chips by changing color of parent div
    // Color is default for unchecked and primary for checked
    // Check color of each parent div before and after click
    chips.forEach((chip) => {
      expect(chip.parentElement?.className).toContain("MuiChip-colorDefault");
      fireEvent.click(chip);
      expect(chip.parentElement?.className).toContain("MuiChip-colorPrimary");
    });
  });

  it("Inputs should automatically go to max when input is higher than max (same for min)", async () => {
    const inputs = document.getElementsByTagName("input");
    const minElevationDifferenceInput = inputs[1];
    const minBaseElevationInput = inputs[3];

    fireEvent.change(minElevationDifferenceInput, { target: { value: 10000 } });
    fireEvent.click(minBaseElevationInput);
    await waitFor(() => {
      expect(minElevationDifferenceInput.value).toBe("3000");
    });
  });

  it("Filter snapshot", () => expect(screen).toMatchSnapshot());
});
