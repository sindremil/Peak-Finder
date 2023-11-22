// Allows for DOM specific testing methods
import "@testing-library/jest-dom";

// Setup for Mock Service Worker
import { setupServer } from "msw/node";
import handlers from "../mocks/handlers";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "warn",
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
});
