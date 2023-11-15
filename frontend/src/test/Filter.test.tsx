import { describe, it } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import renderWithReduxProviders from "../utils/testUtils";
import Filter from "../components/Filter/Filter";

describe("Filter", () => {
  it("Values in input fields should update when sliders are used", async () => {
    renderWithReduxProviders(<Filter />);

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
  })

  it("Color of chips should change when clicked", async () => {
    renderWithReduxProviders(<Filter />);

    // Get all chips
    const parkChip = screen.getByText("Park");
    const nightSkiingChip = screen.getByText("Kveldskjøring");
    const chairLiftChip = screen.getByText("Stolheis");
    const gondolaChip = screen.getByText("Gondol");
    const certifiedChip = screen.getByText("Peak Finder Sertifisert");
    
    // MUI symbolized checked chips by changing color of parent div
    // Color is default for unchecked, so first we expect the color to be default
    expect(parkChip.parentElement?.className).toContain("MuiChip-colorDefault");
    expect(nightSkiingChip.parentElement?.className).toContain("MuiChip-colorDefault");
    expect(chairLiftChip.parentElement?.className).toContain("MuiChip-colorDefault");
    expect(gondolaChip.parentElement?.className).toContain("MuiChip-colorDefault");
    expect(certifiedChip.parentElement?.className).toContain("MuiChip-colorDefault");
    
    // Click all chips
    fireEvent.click(parkChip);
    fireEvent.click(nightSkiingChip);
    fireEvent.click(chairLiftChip);
    fireEvent.click(gondolaChip);
    fireEvent.click(certifiedChip);

    // When checked color should change to primary unless stated otherwise in custom themes
    await waitFor(() => {
      expect(parkChip.parentElement?.className).toContain("MuiChip-colorPrimary");
      expect(nightSkiingChip.parentElement?.className).toContain("MuiChip-colorPrimary");
      expect(chairLiftChip.parentElement?.className).toContain("MuiChip-colorPrimary");
      expect(gondolaChip.parentElement?.className).toContain("MuiChip-colorPrimary");
      expect(certifiedChip.parentElement?.className).toContain("MuiChip-colorPrimary");
    })
  })
})