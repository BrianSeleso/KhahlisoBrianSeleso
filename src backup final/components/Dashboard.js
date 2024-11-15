// src/components/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : `M ${numericPrice.toFixed(2)}`; // Change $ to M
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Adjust according to your storage method
    navigate('/login'); // Redirect to login after logout
  };

  const handleAddNewProduct = () => {
    navigate('/products'); // Navigate to Product Management page
  };

  // Find products with low stock (quantity < 10)
  const lowStockProducts = products.filter(product => product.quantity < 10);

  return (
    <div style={{ padding: '20px' }}>
      <header className="header">
        <h2>Dashboard</h2>
      </header>

      <h3 className="header">Existing Products</h3>

      <section style={{ marginTop: '20px' }}>
        {/* Display Low Stock Warning if there are products with low stock */}
        {lowStockProducts.length > 0 && (
          <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
            Low on Stock:
            <ul>
              {lowStockProducts.map(product => (
                <li key={product.id}>{product.name} (Quantity: {product.quantity})</li>
              ))}
            </ul>
          </div>
        )}
        {products.length === 0 ? (
          <p>No products have been added yet.</p>
        ) : (
          <div>
            <ProductBarChart products={products} /> {/* Render the ProductBarChart */}
          </div>
        )}
      </section>

      <h3 className="header">Product List</h3>
      <section className="product-form-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatPrice(product.price)}</td> {/* Change to M */}
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add New Product Button positioned at the bottom of the table */}
        <button onClick={handleAddNewProduct} style={{ marginTop: '20px' }}>
          Add New Product
        </button>
      </section>
    </div>
  );
};

export default Dashboard;
