import { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppStore, RootState } from "../store";
import searchReducer from "../components/Searchbar/searchSlice";
import filterReducer from "../components/Filter/filterSlice";

// QueryClientProvider is needed for components using react-query hooks
const tanstackClient = new QueryClient();

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

// This is the initial state of the store for testing purposes
const initialPreloadedState = {
  filter: {
    sortType: "",
    hasPark: false,
    hasNightSkiing: false,
    hasChairlift: false,
    hasGondola: false,
    isCertified: false,
    minElevationDifference: 0,
    minBaseElevation: 0,
    minTotalPiste: 0,
    minTotalLifts: 0,
    maxDayPassPrice: 200,
  },
  search: {
    searchTerm: "",
  },
};

// This function is used by tests that render components that use the redux store
// Renders component with necessary redux providers
export default function renderWithReduxProviders(
  ui: React.ReactElement,
  {
    preloadedState = initialPreloadedState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { filter: filterReducer, search: searchReducer },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <QueryClientProvider client={tanstackClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
