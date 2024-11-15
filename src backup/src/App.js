import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupAndLogin from './components/SignupAndLogin';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import UserManagement from './components/UserManagement';
import './Style.css';
import { useState } from 'react';
import logo from './components/logo.png'; // Make sure the logo is in src/assets folder

function App() {
  const [products, setProducts] = useState([]); // Lifted product state

  return (
    <Router>
      <div className="header">
        <img src={logo} alt="Wings Cafe Logo" className="header-logo" />
        <h2>Wings Cafe Inventory System</h2>
      </div>
      
      <Routes>
        <Route path="/" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/signup" element={<SignupAndLogin isLogin={false} />} />
        <Route path="/login" element={<SignupAndLogin isLogin={true} />} />
        <Route path="/dashboard" element={<Dashboard products={products} />} />
        <Route path="/products" element={<ProductManagement setProducts={setProducts} />} />
        <Route path="/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
