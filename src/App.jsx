import { Outlet } from 'react-router-dom';
import './App.css'
import LogInButton from './LogInButton';
import LogoutButton from './LogOutButton';
import SignUpButton from './SignUpButton';
import Context from './context';
import { useEffect, useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  function goHome(){
    window.location.href = '/';
  };
  function checkForToken(){
    let cookies = document.cookie;
    if(cookies.includes("Authorization") && cookies.includes("Bearer")) return true;
    return false;      
  };

  useEffect(() => {
    setLoggedIn(checkForToken());
  }, []);
  return (
    <Context.Provider value={{loggedIn, setLoggedIn}}>
      <div id='header'>
        <h1 onClick={goHome} style={{cursor: 'pointer'}}>Blog</h1>
        {checkForToken() ? <LogoutButton /> : <div className='topRightButtons'><SignUpButton /><LogInButton /></div>}
      </div>
      <div id='body'>
        <Outlet />
      </div>
    </Context.Provider>
  )
}

export default App
