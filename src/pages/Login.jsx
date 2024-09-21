// src/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// import {  useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(Cookies.get('token') || '');
//   const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      setToken(response.data.token);
      Cookies.set('token', response.data.token); // Save the token in a cookie
      window.location.href = '/home'; // Redirect to home after login
      alert('logged in')
    } catch (error) {
      alert('Error logging in. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setToken('');
    Cookies.remove('token'); // Remove the token from the cookie
    alert('Logged out successfully!');
  };

  useEffect(() => {
    // Update token from cookies on component mount
    const savedToken = Cookies.get('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div>
        <a href="/register">Register</a>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {token && (
        <div>
          <p>Token: {token}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
