import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

// eslint-disable-next-line react/prop-types
function LogoLink({ href, src, alt }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img src={src} className="logo" alt={alt} />
    </a>
  );
}

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // The code that we want to run
    console.log("The count is:", count);

    // Optional return function
    return () => {
      console.log("I am being cleaned up!");
    };
  }, [count]); // The dependency array

  return (
    <main>
      <section>
        <LogoLink
          href="https://react.dev/reference/react/useEffect"
          src={reactLogo}
          alt="React logo"
          className="react"
        />
      </section>
      <h1>useEffect</h1>
      <section className="card">
        <h1>Count: {count}</h1>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </section>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </main>
  );
}

export default App;
