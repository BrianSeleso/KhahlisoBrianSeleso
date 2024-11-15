import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductManagement = ({ setProducts }) => {
  const [products, setLocalProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setLocalProducts(response.data);
      setProducts(response.data); // Update shared products state
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, newProduct);
        setEditingProduct(null);
      } else {
        await axios.post('http://localhost:5000/api/products', newProduct);
      }
      fetchProducts();
      setNewProduct({ name: '', description: '', price: '', quantity: '' });
      setError('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      setError('Error adding/updating product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleSellProduct = async (id) => {
    const product = products.find((p) => p.id === id);
    if (product && product.quantity > 0) {
      const updatedQuantity = product.quantity - 1;
      try {
        await axios.put(`http://localhost:5000/api/products/${id}`, {
          ...product,
          quantity: updatedQuantity,
        });
        fetchProducts();
      } catch (err) {
        console.error('Error selling product:', err);
        setError('Error selling product');
      }
    } else {
      setError('Product is out of stock');
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  // Filter low stock products
  const lowStockProducts = products.filter(product => product.quantity < 10);

  // Format price to display Maloti (M)
  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : `M ${numericPrice.toFixed(2)}`;
  };

  return (
    <div className="product-management">
      <header className="header">
        <h2>Product Management</h2>
      </header>

      <h2 className="header">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>

      <form onSubmit={handleAddProduct} className="product-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h2 className="header">Product List</h2>

      <section className="product-form-container">
        {/* Display Low Stock Warning if there are products with low stock */}
        {lowStockProducts.length > 0 && (
          <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
            Low on Stock:
            <ul>
              {lowStockProducts.map(product => (
                <li key={product.id}>
                  {product.name} (Quantity: {product.quantity})
                </li>
              ))}
            </ul>
          </div>
        )}

        <table className="product-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{formatPrice(product.price)}</td> {/* Use the formatPrice function to display price with Maloti */}
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>Edit</button>
                  <button onClick={() => handleSellProduct(product.id)}>Sell</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ProductManagement;
