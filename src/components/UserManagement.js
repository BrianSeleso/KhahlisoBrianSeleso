import React, { useState } from 'react';

function UserManagement({ users, setUsers }) {
  const [userForm, setUserForm] = useState({ id: '', username: '', password: '' });

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newUsers = [...users];
    
    if (userForm.id) {
      // Update existing user
      const index = newUsers.findIndex(user => user.id === userForm.id);
      newUsers[index] = userForm;
    } else {
      // Add new user
      newUsers.push({ id: newUsers.length + 1, ...userForm });
    }
    
    setUsers(newUsers);
    setUserForm({ id: '', username: '', password: '' }); // Reset form
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    }
  };

  // Function to display existing users in a table
  const displayUsers = () => {
    return users.map(user => (
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>
          <button onClick={() => setUserForm(user)}>Edit</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
        </td>
      </tr>
    ));
  };

  return (
    <section id="userManagementSection">
      <h2>User Management</h2>

      <h3>Existing Users</h3>
      <table id="userTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayUsers()}
        </tbody>
      </table>

      {/* Add New User Section */}
      <h3>Add New User</h3> {/* Added heading for adding new users */}
      <form id="userForm" onSubmit={handleUserSubmit}>
        <input type="hidden" value={userForm.id} />
        <p>Username:</p>
        <input 
          type="text" 
          placeholder="Enter Username" 
          value={userForm.username} 
          onChange={(e) => setUserForm({ ...userForm, username: e.target.value })} 
          required 
        />
        <p>Password:</p>
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={userForm.password} 
          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} 
          required 
        />
        {/* Change button text to "Add New User" */}
        <button type="submit">{userForm.id ? 'Update User' : 'Add New User'}</button>
      </form>
    </section>
  );
}

export default UserManagement;