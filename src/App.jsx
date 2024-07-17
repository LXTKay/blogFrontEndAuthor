import { Outlet } from 'react-router-dom';
import './App.css'
import LogInButton from './LogInButton';
import LogoutButton from './LogOutButton';

function App() {
  function goHome(){
    window.location.href = '/';
  };
  function checkForToken(){
    let cookies = document.cookie;
    if(cookies.includes("Authorization") && cookies.includes("Bearer")) return true;
    return false;      
  };
  return (
    <>
      <div id='header'>
        <h1 onClick={goHome} style={{cursor: 'pointer'}}>Blog</h1>
        {checkForToken() ? <LogoutButton /> : <LogInButton />}
      </div>
      <div id='content'>
        <Outlet />
      </div>
    </>
  )
}

export default App
