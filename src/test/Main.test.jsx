import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import App from '../App.jsx';
import { QueryClientProvider } from '@tanstack/react-query';

// Directly mock ReactDOM.createRoot
const mockRender = vi.fn();
vi.spyOn(ReactDOM, 'createRoot').mockImplementation(() => ({
  render: mockRender,
}));

// Mocking ReactDOM.createRoot and its render method
vi.mock('react-dom/client', async (importOriginal) => {
  const originalModule = await importOriginal();
  const renderMock = vi.fn();
  return {
    ...originalModule,
    createRoot: vi.fn().mockReturnValue({
      render: renderMock,
    }),
    __esModule: true, // Ensure ES module compatibility
  };
});

describe('main.jsx', () => {
  let rootElement;

  beforeEach(() => {
    // Create a root element and append it to the document body
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  });

  afterEach(() => {
    // Cleanup mocks and remove the root element
    vi.restoreAllMocks();
    if (rootElement) {
      rootElement.remove();
    }
  });

  it('renders without crashing', async () => {
    // Dynamically import the main.jsx file
    await import('../main.jsx'); // Adjust the path as necessary

    // Verify createRoot was called once
    expect(ReactDOM.createRoot).toHaveBeenCalledTimes(1);
    // Verify render was called with <React.StrictMode><App /></React.StrictMode>
    const renderMock = ReactDOM.createRoot.mock.results[0].value.render;
    expect(renderMock).toHaveBeenCalledWith(
      <React.StrictMode>
        <QueryClientProvider client={expect.anything()}>
          <App />
        </QueryClientProvider>
      </React.StrictMode>
    );
  });
});