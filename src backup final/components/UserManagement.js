// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch users from the server
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/signup', newUser);
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Error adding user');
    }
  };

  // Edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, password: '' });
  };

  // Update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, newUser);
      setEditingUser(null);
      setNewUser({ username: '', password: '' });
      fetchUsers();
    } catch (error) {
      setError('Error updating user');
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      setError('Error deleting user');
    }
  };

  // Handle logout
  const handleLogout = () => {
    // Clear any authentication tokens or session data if needed
    navigate('/login');
  };

  return (
    <div className="user-management">
      <header className="header">
        <h2>User Management</h2>
      </header>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>
    <section className="product-form-container">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
    </div>
  );
};

export default UserManagement;
