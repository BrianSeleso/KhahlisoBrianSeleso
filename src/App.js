import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';

function App() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []);
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));
  const [loginError, setLoginError] = useState('');
  const [lowStockAlert, setLowStockAlert] = useState([]);

  useEffect(() => {
    if (currentUser) checkLowStock();
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('products', JSON.stringify(products));
  }, [currentUser, users, products]);

  const handleLoginOrRegister = (username, password, isRegistering) => {
    if (isRegistering) {
      const existingUser = users.find(u => u.username === username);
      if (existingUser) {
        setLoginError('Username already exists. Please login.');
      } else {
        const newUser = { id: users.length + 1, username, password };
        setUsers([...users, newUser]);
        localStorage.setItem('currentUser', username);
        setCurrentUser(username);
        setLoginError('');
      }
    } else {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', username);
        setCurrentUser(username);
        setLoginError('');
      } else {
        setLoginError('User not found. Please register first.');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const checkLowStock = () => {
    setLowStockAlert(products.filter(product => product.quantity < 10));
  };

  return (
    <Router>
      <div className="App">
        <header>
          <img src="logo.png" width="210" height="170" alt="Logo" />
          <h1>Stock Inventory System</h1>
          {/* Conditional rendering of navigation */}
          {currentUser && (
            <nav>
              <Link to="/dashboard">Dashboard</Link> | 
              <Link to="/product-management">Product Management</Link> | 
              <Link to="/user-management">User Management</Link>
            </nav>
          )}
          
          {currentUser && (
            <div id="userStatus">
              <p id="loggedInUser">Logged in as: {currentUser}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </header>

        <Routes>
          <Route path="/" element={!currentUser ? <LoginForm onLogin={handleLoginOrRegister} loginError={loginError} /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={currentUser ? <Dashboard products={products} lowStockAlert={lowStockAlert} setProducts={setProducts} /> : <Navigate to="/" />} />
          <Route path="/user-management" element={currentUser ? <UserManagement users={users} setUsers={setUsers} /> : <Navigate to="/" />} />
          <Route path="/product-management" element={currentUser ? <ProductManagement products={products} setProducts={setProducts} checkLowStock={checkLowStock} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;