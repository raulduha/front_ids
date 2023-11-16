import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserPage.css';

const roleMapping = {
  0: 'Machine Worker',
  1: 'Warehouse Worker',
  2: 'Supervisor',
  3: 'Manager',
  4: 'Admin'
};

export function UserPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    axios.get('http://24.144.85.42:8001/records/api/v1/users/')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const filterByRole = (role) => {
    setSelectedRole(role);
    if (role !== null) {
      setFilteredUsers(users.filter(user => user.role === role));
    } else {
      setFilteredUsers(users);
    }
  };

  return (
    <div className="user-page">
      <h1>Users</h1>
      <div className="role-buttons">
        {Object.entries(roleMapping).map(([role, roleName]) => (
          <button 
            key={role} 
            className={`role-button ${selectedRole === parseInt(role) ? 'active' : ''}`}
            onClick={() => filterByRole(parseInt(role))}
          >
            {roleName}
          </button>
        ))}
        <button className="role-button reset" onClick={() => filterByRole(null)}>Todos</button>
      </div>
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.first_name} {user.last_name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {roleMapping[user.role]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
