import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function LogoLink({ href, src, alt }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img src={src} className="logo" alt={alt} />
    </a>
  )
}

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current++;

    console.log("State:", count);
    console.log("Ref:", countRef.current);
  };

  return (
    <main>
      <section>
        <LogoLink href="https://react.dev/reference/react/useRef" src={reactLogo} alt="React logo" className="react" />
      </section>
      <h1>UseRef React hook</h1>
      <section className="card">
      Count is {count}
      <br/>
      <button onClick={handleIncrement}>Increment</button>
      </section>
    </main>
  )
}

export default App