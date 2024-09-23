// src/routes/Router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login'; // Adjust the path if necessary
import Register from '../Pages/Register'; // Adjust the path if necessary
import Home from '../pages/Home'; // Example protected route
import Admin from '../pages/AdminPage';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/" />} />
      <Route path='/admin' element={<Admin/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
