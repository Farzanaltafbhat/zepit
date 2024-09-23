import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import axios from 'axios';
import { useAuth } from '../pages/AuthContext'; // Import the context for user info

const Home = () => {
  const { token } = useAuth(); // Get token from AuthContext
  const [userRole, setUserRole] = useState(''); // State to store user role
  const [upgradeRequested, setUpgradeRequested] = useState(false); // State to check if upgrade is requested

  // Fetch the user role when the component mounts
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }, // Send token for authorization
        });
        setUserRole(response.data.role);
        setUpgradeRequested(response.data.requestUpgrade); // Fetch if user already requested upgrade
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token) fetchUserRole(); // Only fetch if the user is logged in
  }, [token]);

  // Handle upgrade request
  const handleRequestUpgrade = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/request-upgrade', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUpgradeRequested(true); // Set the request flag to true after successful request
      alert(response.data);
    } catch (error) {
      console.error('Error requesting upgrade:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <br />
      <br />
      <Hero />
      <Features />
      
      {/* Temporary: Show the button for testing purposes */}
      {/* You can remove the role and request check for testing */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button
          onClick={handleRequestUpgrade}
          style={{
            backgroundColor: '#0E82FD',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#0E82FD')}
        >
          Request Shopkeeper Upgrade (Test Mode)
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
