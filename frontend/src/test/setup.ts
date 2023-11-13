// Allows for DOM specific testing methods
import '@testing-library/jest-dom'

// Setup for Mock Service Worker
import { handlers } from "../mocks/handlers";
import { setupServer } from "msw/node";

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn'
  })
  console.log('MSW is listening')
})

afterEach(() => server.resetHandlers())

afterAll(() => {
  console.log('MSW closed')
  server.close()
})

// To confirm api calls are intercepted by MSW
server.events.on('request:start', ({ request }) => {
  console.log('MSW intercepted:', request.method, request.url)
})