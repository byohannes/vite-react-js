// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useQuery } from 'react-query';

// Simulating a fetch function to get users from an API
export const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function Users() {
  // Using useQuery to fetch users
  const { data: users, error, isLoading, isError } = useQuery('users', fetchUsers);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <section className='card'>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </section>
  );
}

export default Users;

// TBD: Write unit tests for this component
