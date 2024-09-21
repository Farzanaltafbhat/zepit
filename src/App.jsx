// src/App.js
import React, { useEffect, useState } from 'react';
import AppRouter from './routes/Router'; // Adjust the import path if necessary
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsLoggedIn(!!token); // Simplified check for token presence
  }, []);

  return (
    <div>
      {isLoggedIn ? (
      <h1>WELCOME</h1>
      ) : (
        <h1>Please log in or register.</h1>
      )}
      <AppRouter isLoggedIn={isLoggedIn} />
    </div>
  );
  
};

export default App;
