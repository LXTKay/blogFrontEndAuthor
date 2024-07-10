import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id='header'>
        <h1>Blog</h1>
      </div>
      <div id='content'>
        <p>Content here</p>
      </div>
    </>
  )
}

export default App
