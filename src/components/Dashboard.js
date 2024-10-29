import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard({ products, lowStockAlert, setProducts }) {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(product => product.id === productId);
    navigate('/product-management', { state: { product: productToEdit } });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      setMessage("Product deleted successfully!");
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSellProduct = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        
        return { ...product, quantity: Math.max(product.quantity - 1, 0) };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setMessage("Product sold successfully!");
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <section id="dashboard">
      <h2>Stock Dashboard</h2>
      {message && <div className="success-message">{message}</div>}
      {lowStockAlert.length > 0 && (
        <div id="lowStockAlert">
          {lowStockAlert.map(product => (
            <p key={product.id}>Product "{product.name}" is low on stock!</p>
          ))}
        </div>
      )}
      <table id="productTable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price (M)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              {/* Ensure price is displayed correctly */}
              <td>M {parseFloat(product.price).toFixed(2)}</td> 
              {}
              <td>{product.quantity}</td>
              <td>
                {/* Edit, Delete, and Sell buttons */}
                <button onClick={() => handleEditProduct(product.id)} aria-label={`Edit ${product.name}`}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)} aria-label={`Delete ${product.name}`}>Delete</button>
                {/* Sell button */}
                <button onClick={() => handleSellProduct(product.id)} aria-label={`Sell ${product.name}`}>Sell</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {}
      <button onClick={() => navigate('/product-management')} style={{ marginTop: '10px', width: '150px' }}>
        Add Product
      </button>
    </section>
  );
}

export default Dashboard;