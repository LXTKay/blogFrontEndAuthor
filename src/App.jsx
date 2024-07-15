import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <div id='header'>
        <h1>Blog</h1>
      </div>
      <div id='content'>
        <Outlet />
      </div>
    </>
  )
}

export default App
