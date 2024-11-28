import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : `M ${numericPrice.toFixed(2)}`; 
  };

  const handleAddNewProduct = () => {
    navigate('/products');
  };

  const lowStockProducts = products.filter(product => product.quantity < 10);

  return (
    <div style={{ padding: '20px' }}>
      <header className="header">
        <h2>Dashboard</h2>
      </header>

      <h3 className="header">Existing Products</h3>

      <section style={{ marginTop: '20px' }}>
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
            <ProductBarChart products={products} />
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
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{formatPrice(product.price)}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={handleAddNewProduct} style={{ marginTop: '20px' }}>
          Add New Product
        </button>
      </section>
    </div>
  );
};

export default Dashboard;