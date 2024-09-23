import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response || error);
    }
  };

  const approveUpgrade = async (userId) => {
    console.log("Trying to approve upgrade for user ID:", userId);

    try {
      const response = await axios.post(`http://localhost:5000/api/approve-upgrade/${userId}`);
      console.log("Response from server:", response.data);
      // Optionally, refresh the user list after approval
      fetchUsers();
    } catch (error) {
      console.error("Error approving upgrade:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email} - Role: {user.role}
            {user.upgradeRequested && (
              <button onClick={() => approveUpgrade(user._id)}>Approve Upgrade</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
