import React, { useState, useEffect } from 'react';

// UserManagement component handles user creation, editing, and deletion
const UserManagement = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([]);
  
  // State to hold the new user's information
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  
  // State to keep track of the user being edited
  const [editingUser, setEditingUser] = useState(null);
  
  // State to store error messages
  const [error, setError] = useState('');

  // Fetch the list of users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch users from the server
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json(); // Parse the response data as JSON
      setUsers(data); // Update the users state with the fetched data
    } catch (error) {
      setError('Error fetching users'); // Set an error message if fetching fails
    }
  };

  // Handle changes in input fields for new user data
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Function to add a new user
  const handleAddUser = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(newUser), // Convert new user data to JSON format
      });
      if (!response.ok) {
        throw new Error('Error adding user');
      }
      setNewUser({ username: '', password: '' }); // Reset input fields after addition
      fetchUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      setError('Error adding user'); // Set an error message if adding fails
    }
  };

  // Function to prepare editing a user
  const handleEditUser = (user) => {
    setEditingUser(user); // Set the user being edited
    setNewUser({ username: user.username, password: '' }); // Populate input fields with user's data
  };

  // Function to update an existing user's information
  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      const response = await fetch(`http://localhost:5000/api/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
        },
        body: JSON.stringify(newUser), // Convert updated user data to JSON format
      });
      if (!response.ok) {
        throw new Error('Error updating user');
      }
      setEditingUser(null); // Clear editing state after updating
      setNewUser({ username: '', password: '' }); // Reset input fields after update
      fetchUsers(); // Refresh the user list after updating a user
    } catch (error) {
      setError('Error updating user'); // Set an error message if updating fails
    }
  };

  // Function to delete a user by ID
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE', // Specify DELETE method for removing a user
      });
      if (!response.ok) {
        throw new Error('Error deleting user');
      }
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      setError('Error deleting user'); // Set an error message if deletion fails
    }
  };

  return (
    <div className="user-management">
      <header className="header">
        <h2>User Management</h2>
      </header>
      
      {error && <p className="error">{error}</p>} {/* Display any error messages */}
      
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleInputChange} // Update username state on input change
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange} // Update password state on input change
          required
        />
        <button type="submit">
          {editingUser ? 'Update User' : 'Add User'} {/* Change button text based on editing state */}
        </button>
      </form>

      <section className="product-form-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Actions</th> {/* Column for action buttons */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td> {/* Display username */}
                <td>
                  <button onClick={() => handleEditUser(user)}>Edit</button> {/* Edit button */}
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button> {/* Delete button */}
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