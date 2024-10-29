import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProductManagement({ products, setProducts }) {
  const location = useLocation();
  const navigate = useNavigate();

  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  
  useEffect(() => {
    if (location.state && location.state.product) {
      const { product } = location.state;
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      
      
      if (typeof product.price === 'number') {
        setPrice(product.price.toFixed(2)); 
      } else {
        setPrice(parseFloat(product.price).toFixed(2)); 
      }
      
      setQuantity(product.quantity);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new product object
    const updatedProduct = {
      id: location.state && location.state.product ? location.state.product.id : products.length + 1,
      name,
      description,
      category,
      price: parseFloat(price).toFixed(2), // Ensure price is a float with two decimals
      quantity,
    };

    // If editing an existing product, update it; otherwise add a new one
    if (location.state && location.state.product) {
      const updatedProducts = products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
    } else {
      // Add new product
      setProducts([...products, updatedProduct]);
    }

    // Update local storage
    localStorage.setItem('products', JSON.stringify([...products]));

    // Navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <section id="productManagement">
      <h2>{location.state && location.state.product ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Price (M):</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            step="0.01" 
            required 
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>

        {/* Submit Button */}
        <button type="submit">{location.state && location.state.product ? 'Update Product' : 'Add Product'}</button>

        {}
        <button type="button" onClick={() => navigate('/dashboard')}>Cancel</button>
      </form>

      {}
      <h3>Product List</h3>
      {products.length > 0 ? (
        <table id="productListTable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price (M)</th>
              <th>Quantity</th>
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
                {/* Ensure quantity is displayed correctly */}
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available.</p> // Message when there are no products
      )}
    </section>
  );
}

export default ProductManagement;