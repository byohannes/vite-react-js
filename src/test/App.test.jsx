import { expect } from 'chai';
import { describe, it, vi, beforeAll, afterAll, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "../App"; // Adjust the import path as necessary
import { fetchUsers } from "../App"; // Adjust the import path as necessary

// Mock fetchUsers function
vi.mock("../Users", async () => {
  const originalModule = await vi.importActual("../Users"); // Import the original module
  return {
    __esModule: true, // This property tells the module system that we're simulating ESModule exports
    default: originalModule.default, // Mock the default export if necessary, or provide a mock implementation
    fetchUsers: vi.fn() // Provide a mock implementation for fetchUsers
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
    globalThis.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" }
      ])
    }));
  });

  afterAll(() => {
    globalThis.fetch.mockRestore();
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

    render(<Users />, { wrapper: createWrapper() });

    
    expect(screen.queryByText(/Loading.../)).to.not.be.null;
  });

  it.skip("renders error state correctly", async () => {
    fetchUsers.mockImplementationOnce(() =>
      Promise.reject(new Error("Network response was not ok"))
    );

    render(<Users />, { wrapper: createWrapper() });

    // Use Chai's expect with waitFor for asynchronous elements
    await waitFor(() => {
      expect(screen.queryByText(/Error:/)).to.not.be.null;
    });
  });

  it.skip("renders users correctly after fetching", async () => {
    await waitFor(() => {
      const textMatcher = (content, node) => {
        const hasText = (node) => node.textContent === "John Doe";
        const nodeHasText = hasText(node);
        const childrenDontHaveText = Array.from(node.children).every(
          (child) => !hasText(child)
        );
    
        return nodeHasText && childrenDontHaveText;
      };
    
      // Use Chai's expect to check if the element is not null
      expect(screen.queryByText(textMatcher)).to.not.be.null;
    });
  });
});