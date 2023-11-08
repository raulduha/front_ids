import React, { useState, useEffect } from 'react';
import './StoragePage.css';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function StoragePage() {
  const [storageItems, setStorageItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [storage, setStorage] = useState([]);
  const [users, setUsers] = useState([]);
  const [newStorageItem, setNewStorageItem] = useState({
    product_id: '',
    quantity: '',
    modified_by: null,
  });

  const baseURL = 'http://localhost:8000/records/api/v1';
  const { user } = useAuth();
  const navigate = useNavigate();
  // Function to handle deleting a storage item
  const handleDeleteStorageItem = async (itemId) => {
    try {
      await axios.delete(`${baseURL}/storage/${itemId}`);
      toast.success('Storage item deleted successfully!');
      loadStorageItems(); // Reload storage items after deletion
    } catch (error) {
      console.error('Error deleting storage item:', error);
      toast.error('Failed to delete storage item.');
    }
  };

  // Function to handle editing a storage item
  const handleEditStorageItem = async (item) => {
    try {
      await axios.put(`${baseURL}/storage/${item.id}`, item);
      toast.success('Storage item updated successfully!');
      loadStorageItems(); // Reload storage items after update
    } catch (error) {
      console.error('Error updating storage item:', error);
      toast.error('Failed to update storage item.');
    }
  };

  // Load users and products on component mount
  useEffect(() => {
    const loadUsersAndProducts = async () => {
      try {
        const usersResponse = await axios.get(`${baseURL}/users`);
        setUsers(usersResponse.data);
        const productsResponse = await axios.get(`${baseURL}/products`);
        setProducts(productsResponse.data);
        const storageResponse = await axios.get(`${baseURL}/storage`);
        setStorage(storageResponse.data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadUsersAndProducts();
  }, []);

  // Function to load storage items from the API
  const loadStorageItems = async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      setStorageItems(response.data);
    } catch (error) {
      console.error('Error loading storage items:', error);
    }
  };



  // Call loadStorageItems on component mount
  useEffect(() => {
    loadStorageItems();
  }, []);

  const handleCreateStorageItem = async (e) => {
    e.preventDefault();

    // Assuming the user is added to the storage item automatically on the server-side
    const storageData = {
      product_id: newStorageItem.product_id,
      amount: newStorageItem.quantity,
      storage_user_id: user.id,
      modified_by: null,
    };

    try {
      await axios.post(`${baseURL}/storage/`, storageData);
      toast.success('Storage item created successfully!');
      setNewStorageItem({
        product_id: '',
        quantity: '',
        modified_by: null,
      });
      loadStorageItems();
    } catch (error) {
      console.error('Error creating storage item:', error);
      toast.error('Failed to create storage item.');
    }
  };

  return (
    <div className="storage-page">
      <h1>Storage Management</h1>
      <form onSubmit={handleCreateStorageItem}>
        <div className="form-group">
          <label htmlFor="product_id">Product ID:</label>
          <input
            id="product_id"
            type="text"
            value={newStorageItem.product_id}
            onChange={(e) =>
              setNewStorageItem({ ...newStorageItem, product_id: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={newStorageItem.quantity}
            onChange={(e) =>
              setNewStorageItem({ ...newStorageItem, quantity: e.target.value })
            }
          />
        </div>
        <button type="submit">Add to Storage</button>
      </form>
      <ul className="storage-list">
        {storage.map((item) => (
          <li key={item.id} className="storage-item">
            <div className="storage-field">
              <span className="storage-label">Producto:</span>
              <span className="storage-value">
                {products.find((product) => product.product_id === item.product_id)?.brand}
                </span>
            </div>
            <div className="storage-field">
              <span className="storage-label">Tipo:</span>
              <span className="storage-value">
                {products.find((product) => product.product_id === item.product_id)?.type}
                </span>
            </div>
            <div className="storage-field">
              <span className="storage-label">Formato:</span>
              <span className="storage-value">
                {products.find((product) => product.product_id === item.product_id)?.format}
                </span>
            </div>
            <div className="storage-field">
              <span className="storage-label">Monto:</span>
              <span className="storage-value">{item.amount}</span>
            </div>
            <button onClick={() => handleDeleteStorageItem(item.id)}>Delete</button>
            <Link to={`/edit-storage/${item.id}`} className="button">Edit</Link>
            {/* ... display storage item fields ... */}
            {/* Add delete/edit functionality if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StoragePage;