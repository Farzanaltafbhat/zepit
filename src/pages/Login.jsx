import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../pages/AuthContext'; // Import the context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth(); // Get setToken from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      setToken(response.data.token); // Save token in context
      Cookies.set('token', response.data.token); // Save the token in a cookie
      window.location.href = '/home'; // Redirect to home after login
      alert('Logged in');
    } catch (error) {
      alert('Error logging in. Please check your credentials.');
    }
  };

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
    </div>
  );
};

export default Login;
