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
  const [editingItem, setEditingItem] = useState(null);

  const [newStorageItem, setNewStorageItem] = useState({
    product_id: '',
    quantity: '',
    modified_by: null,
  });

  const baseURL = 'http://localhost:8000/records/api/v1';
  const { user } = useAuth();
  const navigate = useNavigate();
  

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
    const response = await axios.get(`${baseURL}/storage`);
    // Sort items from newest to oldest by reversing the sort order
    const sortedItems = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setStorage(sortedItems);
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
    
    const storageData = {
      product_id: newStorageItem.product_id,
      amount: newStorageItem.quantity,
      storage_user_id: user.id,
      modified_by: null,
    };
    
    try {
      const response = await axios.post(`${baseURL}/storage/`, storageData);
      toast.success('Storage item created successfully!');
      
      // Create a new array, add the new item, and sort it
      const newStorageList = [...storage, response.data];
      newStorageList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setStorage(newStorageList); // Update the storage state with the new sorted array
      
      setNewStorageItem({
        product_id: '',
        quantity: '',
        modified_by: null,
      });
    } catch (error) {
      console.error('Error creating storage item:', error);
      toast.error('Failed to create storage item.');
    }
  };
  
  const handleDelete = async (storageId) => {
    // Ask for confirmation before deleting the item
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${baseURL}/storage/${storageId}`);
        toast.success('Item deleted successfully');
        setStorage(storage.filter(item => item.storage_id !== storageId)); // Make sure 'item.id' is the correct identifier
      } catch (error) {
        toast.error('Error deleting item');
        console.error('There was an error deleting the item:', error);
      }
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
            {(user.role === 2 || user.role === 4) && 
              <>

                <button onClick={() => handleDelete(item.storage_id)}>Delete</button>


                <button onClick={() => navigate(`/edit-storage/${item.storage_id}`)}>Edit</button>
              </>
}</li>
        ))}
      </ul>
    </div>
  );
}

export default StoragePage;