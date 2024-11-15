import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import SignupAndLogin from './components/SignupAndLogin';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import './Style.css';
import { useState } from 'react';
import logo from './components/logo.png';

function Header({ onLogout }) {
  const location = useLocation(); // Get the current route

  return (
    <div className="header">
      <img src={logo} alt="Wings Cafe Logo" className="header-logo" />
      <h2>Wings Cafe Inventory System</h2>
      
      {/* Conditionally render the navigation based on the current route */}
      {location.pathname !== '/login' && location.pathname !== '/' && (
        <>
          <nav className="nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/products">Product Management</Link>
            <Link to="/users">User Management</Link>
          </nav>
          <button onClick={onLogout} className="logout-button">Log Out</button>
        </>
      )}
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]); // Lifted product state
  const navigate = useNavigate(); // Call useNavigate inside Router context

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      {/* Background container for animated images */}
      <div className="background-container">
        <div className="background-image background-image1"></div>
      </div>

      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/signup" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/login" element={<SignupAndLogin isLogin={true} />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/products" element={<ProductManagement setProducts={setProducts} />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </>
  );
}

function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;
