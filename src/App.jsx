/* eslint-disable react/jsx-no-comment-textnodes */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'

// eslint-disable-next-line react/prop-types
function Item({ name, isPacked }) {
  return (
    <li className={isPacked ? 'packed' : 'not-packed'}>
      {isPacked ? '🔲' : '🔳'} {name}
    </li>
  );
}

export default function App() {
  return (
    <section className='card'>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}