import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../pages/AuthContext'; // Import the context
import './Login.css'; // Link to the external CSS file

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
      window.location.href = '/'; // Redirect to home after login
      alert('Logged in');
    } catch (error) {
      alert('Error logging in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <a href="/register" className="register-link">Don't have an account? Register here.</a>
      </div>
    </div>
  );
};

export default Login;
