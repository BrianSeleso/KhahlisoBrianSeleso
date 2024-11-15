import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

// SignupAndLogin component handles user registration and login
const SignupAndLogin = () => {
  // State to determine if the user is logging in or signing up
  const [isLogin, setIsLogin] = useState(true);
  
  // State to hold the username and password input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // State to hold any error messages
  const [error, setError] = useState('');
  
  // Hook to programmatically navigate between routes
  const navigate = useNavigate(); 

  // Handle form submission for login or signup
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Determine the API endpoint based on whether the user is logging in or signing up
      const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup'; 
      
      // Make a POST request to the appropriate endpoint with username and password
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify that we're sending JSON data
        },
        body: JSON.stringify({ username, password }), // Convert data to JSON format
      });

      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Throw an error if not successful
      }

      const data = await response.json(); // Parse the response data as JSON

      // Navigate based on whether it's a login or signup action
      if (isLogin) {
        console.log('Login successful:', data); // Log successful login data
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else {
        console.log('Signup successful'); // Log successful signup message
        navigate('/login'); // Redirect to login page after signup
      }
    } catch (err) {
      setError('Error: ' + (err.message || 'Unknown error')); // Set error message if something goes wrong
    }
  };

  return (
    <>
      {/* Header for the authentication page */}
      <header className="header">
        <h3>Welcome, Please Login or Signup.</h3>
      </header>

      {/* Container for the authentication form */}
      <div className="auth-form-container">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2> {/* Display either Login or Signup based on state */}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            required
          />
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
          
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button> {/* Change button text based on state */}
          
          {error && <p className="error">{error}</p>} {/* Display error message if exists */}

          {/* Toggle between Login and Signup forms */}
          <div className="toggle-login-signup">
            <p id='logii'>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Log In'} {/* Change button text based on state */}
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignupAndLogin;