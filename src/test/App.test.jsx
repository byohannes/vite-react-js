import { render, screen } from '@testing-library/react';
import Users from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { expect, test } from 'vitest';

const queryClient = new QueryClient();

test('fetches and displays users', async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );

  const userElements = await screen.findAllByText(/Doe/i);
  expect(userElements).toHaveLength(2);
});

