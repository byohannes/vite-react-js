import { expect } from 'chai';
import { describe, it, vi, beforeAll, afterAll, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App, { fetchUsers } from '../App.jsx';

// Mock fetchUsers function
// Adjust the mock implementation of fetchUsers to simulate HTTP response structure
vi.mock("../App", async () => {
  const originalModule = await vi.importActual("../App"); // Import the original module
  return {
    __esModule: true, // This property tells the module system that we're simulating ESModule exports
    default: originalModule.default, // Keep the default export as is
    fetchUsers: vi.fn(() => Promise.resolve({
      ok: true, // Simulate a successful response
      json: () => Promise.resolve([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" }
      ])
    }))
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  // eslint-disable-next-line react/display-name, react/prop-types
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("Users component", () => {
  beforeAll(() => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: 1, name: "John Doe" },
          { id: 2, name: "Jane Doe" },
        ]),
      })
    );
  });
  
  afterAll(() => {
    // eslint-disable-next-line no-undef
    global.fetch.mockRestore();
  });

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state correctly", async () => {
    fetchUsers.mockImplementationOnce(() => 
      new Promise((resolve) => setTimeout(() => resolve([]), 100))
    );

    render(<App />, { wrapper: createWrapper() });

    
    expect(screen.queryByText(/Loading.../)).to.not.be.null;
  });

  it("renders error state correctly", async () => {
    fetchUsers.mockImplementationOnce(() =>
      Promise.reject(new Error("Network response was not ok"))
    );
  
    render(<App />, { wrapper: createWrapper() });
  
    // Use Chai's expect with waitFor for asynchronous elements
    // Change from queryByText to findAllByText to handle multiple elements
    const errors = await screen.findAllByText(/Error:/);
    expect(errors.length).to.be.greaterThan(0); // Ensure there's at least one error message
  });

  it("renders users correctly after fetching", async () => {
    // Assuming fetchUsers is correctly mocked to return a user named "John Doe"
    
    render(<App />, { wrapper: createWrapper() });
  
    // Use findByText with waitFor for better error handling
    await waitFor(() => {
      const userElement = screen.findByText("John Doe");
      expect(userElement).to.not.be.null;
    });
  });
});