import { useState, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function LogoLink({ href, src, alt }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <img src={src} className="logo" alt={alt} />
    </a>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const incrementCount = useCallback(() => setCount((count) => count + 1), [])

  return (
    <main>
      <section>
        <LogoLink href="https://vitejs.dev" src={viteLogo} alt="Vite logo" />
        <LogoLink href="https://react.dev" src={reactLogo} alt="React logo" className="react" />
      </section>
      <h1>Yohannes + Laura</h1>
      <section className="card">
        <button onClick={incrementCount}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </section>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </main>
  )
}

export default App