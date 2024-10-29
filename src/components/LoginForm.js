import React, { useState } from 'react';

function LoginForm({ onLogin, loginError }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginOrRegister = (e) => {
    e.preventDefault();
    onLogin(username, password, isRegistering);
  };

  return (
    <section id="loginSection">
      <h2>Login or Register</h2>
      <form id="loginForm" onSubmit={handleLoginOrRegister}>
        <h4>Enter Username:</h4>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <h4>Enter Password:</h4>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </form>
      {loginError && <p>{loginError}</p>}
    </section>
  );
}

export default LoginForm;
