// src/App.js
import React, { useEffect, useState } from 'react';
import AppRouter from './routes/Router'; // Adjust the import path if necessary
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import Register from './Pages/Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // Simplified check for token presence
  }, []);

  return (
    <div>
      {isLoggedIn ? (
      <p></p>
      ) : (
       <p></p>
      )}
      <AppRouter isLoggedIn={isLoggedIn} />
    </div>
  );
  
};

export default App;
